import { useMutation } from '@tanstack/react-query';
import { signupApi } from '../services/apiAuth';

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: (userData) => signupApi(userData),
  });

  return { signup, isSigningUp };
}
