import { useMutation } from '@tanstack/react-query';
import { publishBlogApi } from '../services/apiBlog';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function usePublishBlog() {
  const navigate = useNavigate();
  const { mutate: publishBlog, isLoading: isPublishingBlog } = useMutation({
    mutationFn: ({ id }) => publishBlogApi(id),
    onSuccess: () => {
      toast.success('Blog published successfully');
      navigate('/blogs');
    },
    onError: (err) => {
      toast.error(`Blog could not be published: ${err.message}`);
    },
  });

  return { publishBlog, isPublishingBlog };
}
