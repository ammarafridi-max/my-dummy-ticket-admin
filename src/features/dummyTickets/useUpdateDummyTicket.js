import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDummyTicketApi } from '../../services/apiDummyTickets';
import toast from 'react-hot-toast';

export function useUpdateDummyTicket() {
  const queryClient = useQueryClient();
  const { mutate: updateDummyTicket, isLoading: isUpdating } = useMutation({
    mutationFn: updateDummyTicketApi,
    onSuccess: () => {
      toast.success('Dummy ticket updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['dummytickets'] });
    },
    onError: () => {
      toast.error('An error occurred.');
    },
  });

  return { updateDummyTicket, isUpdating };
}
