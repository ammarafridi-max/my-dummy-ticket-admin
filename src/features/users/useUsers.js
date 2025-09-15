import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../services/apiUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useUsers() {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    onError: (error) => {
      toast.error(error.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
  });

  return {
    users,
    isLoadingUsers,
    error,
  };
}
