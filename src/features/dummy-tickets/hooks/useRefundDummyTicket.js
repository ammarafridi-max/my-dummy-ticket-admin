import { useMutation, useQueryClient } from '@tanstack/react-query';
import { refundDummyTicketApi } from '../services/apiDummyTickets';
import toast from 'react-hot-toast';

export function useRefundDummyTicket() {
  const queryClient = useQueryClient();
  const { mutate: refundDummyTicket, isLoading: isRefunding } = useMutation({
    mutationFn: (transactionId) => refundDummyTicketApi(transactionId),
    onSuccess: (data) => {
      toast.success('Refund successful');
      queryClient.invalidateQueries({ queryKey: ['dummytickets'] });
      queryClient.invalidateQueries({ queryKey: ['dummyticket'] });
    },
    onError: (err) => toast.error(err.message || 'Could not refund'),
  });

  return { refundDummyTicket, isRefunding };
}
