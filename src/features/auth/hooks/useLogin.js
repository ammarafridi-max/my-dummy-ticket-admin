import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: async () => {
      toast.success('Welcome back!');
      await refreshUser();
      navigate('/');
    },
    onError: () => {
      toast.error('Invalid credentials');
    },
  });

  return { login, isLoggingIn };
}
