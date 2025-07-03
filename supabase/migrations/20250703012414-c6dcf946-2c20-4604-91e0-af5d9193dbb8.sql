-- Create reviews table for customer feedback
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_request_id UUID NOT NULL REFERENCES public.booking_requests(id) ON DELETE CASCADE,
  service_provider_id UUID NOT NULL REFERENCES public.service_providers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create provider_stats table for aggregated data
CREATE TABLE public.provider_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_provider_id UUID NOT NULL UNIQUE REFERENCES public.service_providers(id) ON DELETE CASCADE,
  total_bookings INTEGER NOT NULL DEFAULT 0,
  completed_bookings INTEGER NOT NULL DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  last_booking_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reviews
CREATE POLICY "Public can view approved reviews" 
ON public.reviews 
FOR SELECT 
USING (is_approved = true);

CREATE POLICY "Anyone can submit reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage reviews" 
ON public.reviews 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for provider_stats
CREATE POLICY "Public can view provider stats" 
ON public.provider_stats 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage provider stats" 
ON public.provider_stats 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to update provider stats
CREATE OR REPLACE FUNCTION update_provider_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update stats for the provider
  INSERT INTO public.provider_stats (service_provider_id, total_reviews, average_rating, updated_at)
  VALUES (
    NEW.service_provider_id,
    1,
    NEW.rating,
    now()
  )
  ON CONFLICT (service_provider_id) 
  DO UPDATE SET
    total_reviews = provider_stats.total_reviews + 1,
    average_rating = (
      SELECT ROUND(AVG(rating::DECIMAL), 2)
      FROM public.reviews 
      WHERE service_provider_id = NEW.service_provider_id 
      AND is_approved = true
    ),
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update booking stats
CREATE OR REPLACE FUNCTION update_booking_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update when status changes to completed
  IF NEW.status = 'مكتمل' AND OLD.status != 'مكتمل' THEN
    INSERT INTO public.provider_stats (service_provider_id, total_bookings, completed_bookings, last_booking_at, updated_at)
    VALUES (
      NEW.service_provider_id,
      1,
      1,
      NEW.updated_at,
      now()
    )
    ON CONFLICT (service_provider_id) 
    DO UPDATE SET
      total_bookings = provider_stats.total_bookings + 1,
      completed_bookings = provider_stats.completed_bookings + 1,
      last_booking_at = NEW.updated_at,
      updated_at = now();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_provider_stats_updated_at
BEFORE UPDATE ON public.provider_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_update_provider_stats
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_provider_stats();

CREATE TRIGGER trigger_update_booking_stats
AFTER UPDATE ON public.booking_requests
FOR EACH ROW
EXECUTE FUNCTION update_booking_stats();

-- Create indexes for performance
CREATE INDEX idx_reviews_provider_id ON public.reviews(service_provider_id);
CREATE INDEX idx_reviews_approved ON public.reviews(is_approved);
CREATE INDEX idx_provider_stats_provider_id ON public.provider_stats(service_provider_id);