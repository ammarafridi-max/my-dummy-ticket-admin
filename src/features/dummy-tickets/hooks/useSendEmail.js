import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUpdateDummyTicket } from './useUpdateDummyTicket';
import { sendEmailApi } from '../services/apiEmail';
import toast from 'react-hot-toast';

export function useSendEmail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateDummyTicket } = useUpdateDummyTicket();
  const [searchParams] = useSearchParams();

  const { mutate: sendEmail, isLoading: isSendingEmail } = useMutation({
    mutationKey: ['email'],
    mutationFn: (formData) => sendEmailApi(formData),
    onSuccess: () => {
      toast.success('Email sent successfully');
      queryClient.invalidateQueries({ queryKey: [''] });
      updateDummyTicket({
        sessionId: searchParams.get('sessionId'),
        orderStatus: 'DELIVERED',
      });
      navigate('/mdt/dummy-tickets');
    },

    onError: () => {
      toast.error('Error sending email');
    },
  });

  return { sendEmail, isSendingEmail };
}
