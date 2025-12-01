import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useBlog } from '../hooks/useBlog';
import { useUpdateBlog } from '../hooks/useUpdateBlog';
import BlogForm from '../components/BlogForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';

export default function UpdateBlogPost() {
  const editorRef = useRef(null);
  const { id } = useParams();
  const { blog, isErrorBlog, isLoadingBlog } = useBlog(id);
  const { updateBlog, isUpdatingBlog } = useUpdateBlog();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      metaTitle: '',
      metaDescription: '',
      title: '',
      slug: '',
      excerpt: '',
      tags: [],
      content: '',
    },
  });

  function onSubmit(data) {
    const updatedData = { ...data, content: editorRef.current.getContent() };
    updateBlog({ id, blogData: updatedData });
  }

  useEffect(() => {
    if (blog) {
      reset({
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        tags: blog.tags,
        content: blog.content,
      });
    }
  }, [blog, reset]);

  if (isLoadingBlog) return <Loading />;

  if (isErrorBlog) return <p>Could not load blog data</p>;

  return (
    <>
      <Helmet>
        <title>{`${blog?.title}`} | Blogs</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
          { label: `${blog?.title}`, href: `/blogs/${blog?._id}` },
        ]}
      />
      <PageHeading>{blog?.title}</PageHeading>
      <BlogForm
        blog={blog}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        isLoading={isUpdatingBlog}
        editorRef={editorRef}
      />
    </>
  );
}
