import { useQuery } from '@tanstack/react-query';
import { getAllBlogsApi } from '../services/apiBlog';

export function useBlogs({ page = 1, limit = 10, status, tag, search } = {}) {
  const {
    data,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
  } = useQuery({
    queryKey: ['blogs', page, limit, status, tag, search],
    queryFn: () => getAllBlogsApi({ page, limit, status, tag, search }),
  });

  const blogs = data?.blogs || [];

  return { blogs, isLoadingBlogs, isErrorBlogs };
}
