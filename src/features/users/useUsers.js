import { useQuery } from '@tanstack/react-query';
import { baseURL } from '../../utils/baseUrl';

export function useUsers(username) {
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseURL}/api/users`);
        const resData = await res.json();
        return resData.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isError: isErrorCurrentUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (username) {
        try {
          const res = await fetch(`${baseURL}/api/users/${username}`);
          const data = await res.json();
          return data.data;
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  });

  return {
    users,
    isLoadingUsers,
    isErrorUsers,
    currentUser,
    isLoadingCurrentUser,
    isErrorCurrentUser,
  };
}
