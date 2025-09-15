import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDummyTicketApi } from '../../services/apiDummyTickets';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteDummyTicket() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteDummyTicket, isLoading: isDeleting } = useMutation({
    mutationFn: deleteDummyTicketApi,
    onSuccess: () => {
      toast.success('Dummy Ticket deleted successfully');
      queryClient.removeQueries({ queryKey: ['dummytickets'], exact: false });
      queryClient.removeQueries({ queryKey: ['dummyticket'], exact: false });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    },
    onError: () => {
      toast.error('Could not delete dummy ticket');
    },
  });

  return { deleteDummyTicket, isDeleting };
}
