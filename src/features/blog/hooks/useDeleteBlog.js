import { useMutation } from '@tanstack/react-query';
import { deleteBlogApi } from '../services/apiBlog';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteBlog() {
  const navigate = useNavigate();
  const { mutate: deleteBlog, isLoading: isDeletingBlog } = useMutation({
    mutationFn: (id) => deleteBlogApi(id),
    onSuccess: () => {
      toast.success('Blog deleted successfully');
      navigate('/blogs');
    },
    onError: (err) => {
      toast.error(`Blog could not be deleted: ${err.message}`);
    },
  });

  return { deleteBlog, isDeletingBlog };
}
