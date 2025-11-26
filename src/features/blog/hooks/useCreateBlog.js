import { useMutation } from '@tanstack/react-query';
import { createBlogApi } from '../services/apiBlog';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateBlog() {
  const navigate = useNavigate();
  const { mutate: createBlog, isLoading: isCreatingBlog } = useMutation({
    mutationFn: (formData) => createBlogApi(formData),
    onSuccess: () => {
      toast.success('Blog created successfully');
      // navigate('/blogs');
    },
    onError: (err) => {
      toast.error(`Blog could not be created: ${err.message}`);
    },
  });

  return { createBlog, isCreatingBlog };
}
