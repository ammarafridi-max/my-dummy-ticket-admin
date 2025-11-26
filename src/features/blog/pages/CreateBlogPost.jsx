import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useCreateBlog } from '../hooks/useCreateBlog';
import BlogForm from '../components/BlogForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';

export default function CreateBlogPost() {
  const { createBlog, isCreatingBlog } = useCreateBlog();
  const { handleSubmit, register, control } = useForm({});

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('metaTitle', data.metaTitle);
    formData.append('metaDescription', data.metaDescription);
    formData.append('title', data.title);
    formData.append('slug', data.slug);
    formData.append('excerpt', data.excerpt);
    formData.append('content', data.content);

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => {
        formData.append('tags[]', tag);
      });
    }

    if (data.coverImage && data.coverImage[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    console.log('FormData created!');
    console.log('HOOK FILE:', data.coverImage);
    console.log('HOOK FILE 0:', data.coverImage?.[0]);

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

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
      <BlogForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} control={control} />
    </>
  );
}
