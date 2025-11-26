import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import BlogForm from '../components/BlogForm';

export default function UpdateBlogPost() {
  const { id } = useParams();
  const { blog, isErrorBlog, isLoadingBlog } = useBlog(id);

  console.log(blog);

  return (
    <>
      <BlogForm />
    </>
  );
}
