import { useQuery } from '@tanstack/react-query';
import { baseURL } from '../../utils/baseUrl';

export function useRoles() {
  const {
    data: roles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseURL}/api/roles`);
        const data = await res.json();
        return data.data;
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return { roles, isLoading, isError };
}
