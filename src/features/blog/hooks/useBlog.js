import { useQuery } from '@tanstack/react-query';
import { getBlogByIdApi } from '../services/apiBlog';

export function useBlog(id) {
  const {
    data: blog,
    isLoading: isLoadingBlog,
    isError: isErrorBlog,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogByIdApi(id),
    enabled: !!id,
  });

  return { blog, isLoadingBlog, isErrorBlog };
}
