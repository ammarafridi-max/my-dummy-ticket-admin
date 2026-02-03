import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteInsuranceApplicationApi } from '../services/apiInsurance';
import toast from 'react-hot-toast';

export function useDeleteInsuranceApplication() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteInsuranceApplication, isLoading: isDeleting } = useMutation({
    mutationFn: (sessionId) => deleteInsuranceApplicationApi(sessionId),
    onSuccess: () => {
      toast.success('Insurance application deleted successfully');
      queryClient.removeQueries({ queryKey: ['insuranceApplications'], exact: false });
      queryClient.removeQueries({ queryKey: ['insuranceApplication'], exact: false });
      setTimeout(() => navigate(-1), 2000);
    },
    onError: () => {
      toast.error('Could not delete insurance application');
    },
  });

  return { deleteInsuranceApplication, isDeleting };
}
