import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { Edit3, Save, Send, Trash } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useBlog } from '../hooks/useBlog';
import { useUpdateBlog } from '../hooks/useUpdateBlog';
import { usePublishBlog } from '../hooks/usePublishBlog';
import { useDeleteBlog } from '../hooks/useDeleteBlog';
import BlogForm from '../components/BlogForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';
import ActionButtons from '../../../components/ActionButtons';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

export default function UpdateBlogPost() {
  const editorRef = useRef(null);
  const { id } = useParams();
  const { blog, isErrorBlog, isLoadingBlog } = useBlog(id);
  const { updateBlog, isUpdatingBlog } = useUpdateBlog();
  const { publishBlog, isPublishingBlog } = usePublishBlog();
  const { deleteBlog, isDeletingBlog } = useDeleteBlog();
  const { isAdmin } = useAuth();

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

  function buildFormData(data, { status } = {}) {
    const editorContent = editorRef.current ? editorRef.current.getContent() : '';
    const formData = new FormData();

    formData.append('metaTitle', data.metaTitle || '');
    formData.append('metaDescription', data.metaDescription || '');
    formData.append('title', data.title || '');
    formData.append('slug', data.slug || '');
    formData.append('excerpt', data.excerpt || '');
    formData.append('content', editorContent);

    if (status) {
      formData.append('status', status);
    }

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => formData.append('tags', tag));
    }

    if (data.coverImage && data.coverImage[0]) {
      formData.append('newCoverImage', data.coverImage[0]);
    }

    return formData;
  }

  const handleEdit = handleSubmit((data) => {
    const formData = buildFormData(data);
    updateBlog({ id, blogData: formData });
  });

  const handleSaveDraft = handleSubmit((data) => {
    const formData = buildFormData(data, { status: 'draft' });
    updateBlog({ id, blogData: formData });
  });

  const handlePublish = () => publishBlog({ id });
  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this blog? This action cannot be undone.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteBlog(id),
        },
        {
          label: 'Cancel',
          onClick: () => toast.error('Delete cancelled'),
        },
      ],
    });
  };

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
      <div className="flex items-center justify-between gap-4">
        <PageHeading>{blog?.title}</PageHeading>
        {isAdmin && (
          <ActionButtons
            actions={[
              {
                text: 'Edit',
                icon: Edit3,
                onClick: handleEdit,
                disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
              },
              {
                text: 'Save as Draft',
                icon: Save,
                onClick: handleSaveDraft,
                disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
              },
              {
                text: 'Publish',
                icon: Send,
                onClick: handlePublish,
                disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
              },
              {
                text: 'Delete',
                icon: Trash,
                onClick: handleDelete,
                disabled: isUpdatingBlog || isPublishingBlog || isDeletingBlog,
              },
            ]}
          />
        )}
      </div>
      <BlogForm
        blog={blog}
        register={register}
        onSubmit={handleEdit}
        handleSubmit={handleSubmit}
        control={control}
        isLoading={isUpdatingBlog}
        editorRef={editorRef}
        readOnly={!isAdmin}
      />
    </>
  );
}
