import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getInsuranceApplicationsApi } from '../services/apiInsurance';

export function useInsuranceApplications() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const {
    data,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
  } = useQuery({
    queryKey: ['insuranceApplications', params],
    queryFn: () => {
      const qs = new URLSearchParams(params).toString();
      return getInsuranceApplicationsApi(qs);
    },
    refetchOnMount: 'always',
    keepPreviousData: true,
  });

  console.log(data);

  return {
    applications: data,
    pagination: data?.pagination,
    isLoadingApplications,
    isErrorApplications,
  };
}
