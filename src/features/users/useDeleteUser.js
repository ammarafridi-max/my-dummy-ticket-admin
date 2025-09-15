import { useMutation } from '@tanstack/react-query';
import { deleteUserApi } from '../../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteUser(username) {
  const navigate = useNavigate();
  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationKey: ['user'],
    mutationFn: () => {
      confirm('Are you sure you want to delete this user?');
      deleteUserApi(username);
    },
    onSuccess: () => {
      toast.success('User deleted successfully!');
      navigate('/users');
    },
    onError: () => {
      toast.error('User could not be deleted');
    },
  });

  return { deleteUser, isDeleting };
}
