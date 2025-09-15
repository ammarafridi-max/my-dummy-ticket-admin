import { useMutation } from '@tanstack/react-query';
import { updateUserApi } from '../../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const navigate = useNavigate();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ username, userData }) => updateUserApi(username, userData),
    onSuccess: () => {
      toast.success('User updated successfully');
      navigate('/users');
    },
    onError: () => {
      toast.error('User could not be updated');
    },
  });

  return { updateUser, isUpdating };
}
