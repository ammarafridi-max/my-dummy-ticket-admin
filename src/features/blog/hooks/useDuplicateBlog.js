import { useMutation, useQueryClient } from '@tanstack/react-query';
import { duplicateBlogApi } from '../services/apiBlog';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDuplicateBlog() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: duplicateBlog, isLoading: isDuplicatingBlog } = useMutation({
    mutationFn: (id) => duplicateBlogApi(id),
    onSuccess: () => {
      toast.success('Blog duplicated successfully');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      navigate('/blogs');
    },
    onError: (err) => {
      toast.error(`Blog could not be duplicated: ${err.message}`);
    },
  });

  return { duplicateBlog, isDuplicatingBlog };
}
