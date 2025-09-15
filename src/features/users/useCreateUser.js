import { useMutation } from '@tanstack/react-query';
import { createUserApi } from '../../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateUser() {
  const navigate = useNavigate();
  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success('User created successfully!');
      navigate('/users');
    },
    onError: () => {
      toast.error('User could not be created');
    },
  });

  return { createUser, isCreating };
}
