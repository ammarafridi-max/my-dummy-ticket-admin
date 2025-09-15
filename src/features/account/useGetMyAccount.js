import { useQuery } from '@tanstack/react-query';
import { getAccount } from '../../services/apiAccount';

export function useGetMyAccount() {
  const { data: account, isLoading } = useQuery({
    queryKey: ['account'],
    queryFn: getAccount,
  });

  return { account, isLoading };
}
