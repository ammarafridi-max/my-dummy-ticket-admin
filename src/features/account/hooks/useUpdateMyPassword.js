import { useMutation } from '@tanstack/react-query';
import { updatePasswordApi } from '../services/apiAccount';
import toast from 'react-hot-toast';

export function useUpdateMyPassword() {
  const { mutateAsync: updatePassword, isPending: isUpdating } = useMutation({
    mutationKey: ['account'],
    mutationFn: (data) => updatePasswordApi(data),
    onSuccess: () => {
      toast.success('Password updated successfully!');
    },
    onError: () => {
      toast.error('Could not update password.');
    },
  });

  return { updatePassword, isUpdating };
}
