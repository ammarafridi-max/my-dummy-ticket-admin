import { useMutation } from '@tanstack/react-query';
import { deleteAccount as deleteAccountApi } from '../../services/apiAccount';
import { toast } from 'react-toastify';

export function useDeleteMyAccount() {
  const { mutate: deleteAccount, isLoading: isDeleting } = useMutation({
    mutationKey: ['account'],
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      toast.success('Your account has been successfully deleted.');
      setTimeout(() => {}, 3000);
    },
  });

  return { deleteAccount, isDeleting };
}
