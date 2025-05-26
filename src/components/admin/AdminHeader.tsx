
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface AdminHeaderProps {
  userEmail?: string;
}

const AdminHeader = ({ userEmail }: AdminHeaderProps) => {
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">لوحة الإدارة</h1>
      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-600">
          مرحباً، {userEmail}
        </span>
        <Button variant="outline" onClick={handleLogout}>
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
