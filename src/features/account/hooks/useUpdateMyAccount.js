import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAccountApi } from '../services/apiAccount';
import toast from 'react-hot-toast';

export function useUpdateMyAccount() {
  const queryClient = useQueryClient();
  const { mutateAsync: updateAccount, isPending: isUpdating } = useMutation({
    mutationKey: ['account'],
    mutationFn: (data) => updateAccountApi(data),
    onSuccess: () => {
      toast.success('Account updated successfully');
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: () => {
      toast.error('An error occurred while updating your account');
    },
  });

  return { updateAccount, isUpdating };
}
