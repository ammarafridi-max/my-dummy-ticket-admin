import { useMutation } from '@tanstack/react-query';
import { updatePasswordApi } from '../services/apiAccount';
import { toast } from 'react-toastify';

export function useUpdateMyPassword() {
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationKey: ['account'],
    mutationFn: (data) => updatePasswordApi(data),
    onSuccess: (data) => {
      toast.success('Password updated successfully!');
    },
    onError: (err) => {
      toast.error('Could not update password.');
    },
  });

  return { updatePassword, isLoading };
}
