import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useCreateBlog } from '../hooks/useCreateBlog';
import { useRef } from 'react';
import BlogForm from '../components/BlogForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import { useAuth } from '../../../context/AuthContext';

export default function CreateBlogPost() {
  const editorRef = useRef(null);
  const { createBlog, isCreatingBlog } = useCreateBlog();
  const { handleSubmit, register, control } = useForm({});
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Create Blog Post</title>
        </Helmet>
        <Breadcrumb
          paths={[
            { label: 'Home', href: '/' },
            { label: 'Blogs', href: '/blogs' },
            { label: 'Create Blog Post', href: '/blogs/create' },
          ]}
        />
        <PageHeading>Create Blog Post</PageHeading>
        <p className="mt-6 bg-white p-6 rounded-lg shadow text-sm text-gray-600">
          You do not have permission to create blog posts.
        </p>
      </>
    );
  }

  function onSubmit(data) {
    const formData = new FormData();

    formData.append('metaTitle', data.metaTitle || '');
    formData.append('metaDescription', data.metaDescription || '');
    formData.append('title', data.title || '');
    formData.append('slug', data.slug || '');
    formData.append('excerpt', data.excerpt || '');
    formData.append('status', 'draft');
    formData.append('content', editorRef.current.getContent());

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => formData.append('tags', tag));
    }

    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    createBlog(formData);
  }

  return (
    <>
      <Helmet>
        <title>Create Blog Post</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
          { label: 'Create Blog Post', href: '/blogs/create' },
        ]}
      />
      <PageHeading>Create Blog Post</PageHeading>
      <BlogForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        isLoading={isCreatingBlog}
        editorRef={editorRef}
      />
    </>
  );
}
