import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import StarRating from './StarRating';
import { useSubmitReview } from '@/hooks/useReviews';
import { useToast } from '@/hooks/use-toast';

interface ReviewDialogProps {
  providerId: string;
  providerName: string;
  bookingId?: string;
  trigger?: React.ReactNode;
}

const ReviewDialog = ({ providerId, providerName, bookingId, trigger }: ReviewDialogProps) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const submitReview = useSubmitReview();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !customerName.trim()) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال التقييم والاسم",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitReview.mutateAsync({
        service_provider_id: providerId,
        booking_request_id: bookingId || '',
        customer_name: customerName.trim(),
        rating,
        review_text: reviewText.trim() || undefined,
      });

      toast({
        title: "تم إرسال التقييم",
        description: "شكراً لك على تقييمك",
      });

      setOpen(false);
      setRating(0);
      setCustomerName('');
      setReviewText('');
    } catch (error) {
      toast({
        title: "خطأ في إرسال التقييم",
        description: "حدث خطأ، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            اترك تقييم
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تقييم {providerName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>التقييم *</Label>
            <div className="flex items-center gap-2">
              <StarRating 
                rating={rating} 
                size="lg" 
                interactive 
                showNumber={false}
                onRatingChange={setRating}
              />
              <span className="text-sm text-gray-600">
                {rating > 0 && `${rating} من 5`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName">الاسم *</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewText">التعليق (اختياري)</Label>
            <Textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="أخبرنا عن تجربتك مع المعلم..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              type="submit" 
              disabled={submitReview.isPending}
              className="flex-1"
            >
              {submitReview.isPending ? 'جاري الإرسال...' : 'إرسال التقييم'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;