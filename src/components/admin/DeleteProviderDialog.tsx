
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { useDeleteProvider } from '@/hooks/useAdminData';

interface DeleteProviderDialogProps {
  provider: any;
}

const DeleteProviderDialog = ({ provider }: DeleteProviderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteProvider = useDeleteProvider();

  const handleDelete = async () => {
    try {
      await deleteProvider.mutateAsync(provider.id);
      setIsOpen(false);
    } catch (error) {
      console.error('Error deleting provider:', error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          حذف
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد من حذف مقدم الخدمة "{provider.name}"؟ 
            <br />
            <strong>هذا الإجراء لا يمكن التراجع عنه.</strong>
            <br />
            سيتم حذف جميع البيانات والحجوزات المرتبطة بهذا المقدم.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteProvider.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteProvider.isPending ? 'جاري الحذف...' : 'حذف نهائياً'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProviderDialog;
