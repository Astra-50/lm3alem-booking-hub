
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useProvider } from '@/hooks/useProviders';
import BookingForm from '@/components/booking/BookingForm';
import BookingLoadingState from '@/components/booking/BookingLoadingState';
import BookingErrorState from '@/components/booking/BookingErrorState';

const Booking = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  
  const { data: provider, isLoading: providerLoading } = useProvider(providerId!);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReturnToProviders = () => {
    navigate('/providers');
  };

  if (providerLoading) {
    return (
      <Layout>
        <BookingLoadingState />
      </Layout>
    );
  }

  if (!provider) {
    return (
      <Layout>
        <BookingErrorState onReturnToProviders={handleReturnToProviders} />
      </Layout>
    );
  }

  return (
    <Layout>
      <BookingForm
        providerId={providerId!}
        providerName={provider.name}
        providerPhone={provider.phone}
        providerWhatsapp={provider.whatsapp}
      />
    </Layout>
  );
};

export default Booking;
