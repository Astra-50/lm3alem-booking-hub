import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';
import AdminHeader from '@/components/admin/AdminHeader';
import ProvidersManagement from '@/components/admin/ProvidersManagement';
import BookingsManagement from '@/components/admin/BookingsManagement';
import ProviderApplicationsManagement from '@/components/admin/ProviderApplicationsManagement';

const Admin = () => {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminAuth();

  if (adminLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>جاري التحقق من الصلاحيات...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLogin />;
  }

  return (
    <Layout>
      <div className="py-8">
        <AdminHeader userEmail={user.email} />
        
        <div className="space-y-8">
          {/* Provider Applications Section */}
          <ProviderApplicationsManagement />
          
          {/* Existing Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProvidersManagement />
            <BookingsManagement />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
