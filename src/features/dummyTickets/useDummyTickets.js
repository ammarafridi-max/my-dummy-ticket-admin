import { useQuery } from '@tanstack/react-query';
import { getDummyTicketsApi } from '../../services/apiDummyTickets';
import { useSearchParams } from 'react-router-dom';

export function useDummyTickets() {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  const {
    data,
    isLoading: isLoadingDummyTickets,
    isError: isErrorDummyTickets,
  } = useQuery({
    queryKey: ['dummytickets', params],
    queryFn: () => getDummyTicketsApi(params),
    refetchOnMount: 'always',
    keepPreviousData: true, // 👈 smoother pagination
  });

  return {
    dummyTickets: data?.data,
    pagination: data?.pagination,
    isLoadingDummyTickets,
    isErrorDummyTickets,
  };
}
