import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success('Login successful');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  return { login, isLoggingIn };
}
