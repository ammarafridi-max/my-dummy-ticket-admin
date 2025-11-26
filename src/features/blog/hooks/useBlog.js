import { useQuery } from '@tanstack/react-query';
import { getBlogByIdApi } from '../services/apiBlog';

export function useBlog(id) {
  const {
    data: blog,
    isLoading: isLoadingBlog,
    isError: isErrorBlog,
  } = useQuery({
    queryKey: ['blog'],
    queryFn: () => getBlogByIdApi(id),
  });

  return { blog, isLoadingBlog, isErrorBlog };
}
