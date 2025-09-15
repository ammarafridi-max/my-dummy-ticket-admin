import { useMutation } from '@tanstack/react-query';
import { updateAccount as updateAccountApi } from '../../services/apiAccount';
import toast from 'react-hot-toast';

export function useUpdateMyAccount() {
  const { mutate: updateAccount, isLoading: isUpdating } = useMutation({
    mutationKey: ['account'],
    mutationFn: (data) => updateAccountApi(data),
    onSuccess: () => {
      toast.success('Account updated successfully');
    },
    onError: () => {
      toast.error('An error occurred while updating your account');
    },
  });

  return { updateAccount, isUpdating };
}
