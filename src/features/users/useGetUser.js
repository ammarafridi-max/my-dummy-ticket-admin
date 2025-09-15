import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useGetUser(username) {
  const {
    data: user = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUser(username),
    enabled: !!username, // ✅ only run when username exists
    staleTime: 1000 * 60 * 5, // ✅ cache fresh for 5 mins
    retry: 1, // ✅ retry once on failure
    onError: (err) => {
      console.error('User fetch failed:', err);
      toast.error('Failed to fetch user');
    },
  });

  return { user, isLoading, isError, error, refetch };
}
