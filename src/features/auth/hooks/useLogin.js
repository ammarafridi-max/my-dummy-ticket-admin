import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const { setUser, refreshUser } = useAuth();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: async (user) => {
      toast.success('Welcome back!');

      setUser(user);

      refreshUser();

      navigate('/');
    },
    onError: (err) => {
      toast.error(err.message || 'Invalid credentials');
    },
  });

  return { login, isLoggingIn };
}
