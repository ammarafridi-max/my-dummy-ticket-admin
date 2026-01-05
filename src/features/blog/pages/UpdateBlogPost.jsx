import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useBlog } from '../hooks/useBlog';
import { useUpdateBlog } from '../hooks/useUpdateBlog';
import { usePublishBlog } from '../hooks/usePublishBlog';
import BlogForm from '../components/BlogForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';

export default function UpdateBlogPost() {
  const editorRef = useRef(null);
  const { id } = useParams();
  const { blog, isErrorBlog, isLoadingBlog } = useBlog(id);
  const { updateBlog, isUpdatingBlog } = useUpdateBlog();
  const { publishBlog, isPublishingBlog } = usePublishBlog();

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
    const editorContent = editorRef.current ? editorRef.current.getContent() : '';
    const formData = new FormData();

    formData.append('metaTitle', data.metaTitle || '');
    formData.append('metaDescription', data.metaDescription || '');
    formData.append('title', data.title || '');
    formData.append('slug', data.slug || '');
    formData.append('excerpt', data.excerpt || '');
    formData.append('content', editorContent);

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => formData.append('tags', tag));
    }

    if (data.coverImage && data.coverImage[0]) {
      formData.append('newCoverImage', data.coverImage[0]);
    }

    if (blog?.status === 'draft' || blog?.status === 'archive') {
      publishBlog({ id });
    } else {
      updateBlog({ id, blogData: formData });
    }
  }

  useEffect(() => {
    if (blog) {
      reset({
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        tags: blog.tags || [],
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
