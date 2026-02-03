import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { downloadInsurancePolicyApi } from '../services/apiInsurance';

export function useDownloadInsurancePolicy() {
  const { mutate: downloadPolicy } = useMutation({
    mutationFn: ({ policyId, index }) => downloadInsurancePolicyApi({ policyId, index }),
    onSuccess: (data) => {
      window.location.assign(data.policyDocuments);
      toast.success('Policy downloaded');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { downloadPolicy };
}
