import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateInsuranceApplicationApi } from '../services/apiInsurance';

export function useUpdateInsuranceApplication() {
  const queryClient = useQueryClient();

  const { mutate: updateInsuranceApplication, isLoading: isUpdatingApplication } = useMutation({
    mutationFn: ({ sessionId, orderStatus }) => updateInsuranceApplicationApi({ sessionId, orderStatus }),
    onSuccess: () => {
      toast.success('Insurance application updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['insuranceApplications'] });
      queryClient.invalidateQueries({ queryKey: ['insuranceApplication'] });
    },
    onError: () => {
      toast.error('An error occurred.');
    },
  });

  return { updateInsuranceApplication, isUpdatingApplication };
}
