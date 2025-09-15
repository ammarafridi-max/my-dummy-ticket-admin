import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationKey: ['user'],
    mutationFn: async ({ username, password }) => {
      await loginApi(username, password);
    },
    onSuccess: () => {
      toast.success('Login successful!');
      navigate('/');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoggingIn };
}
