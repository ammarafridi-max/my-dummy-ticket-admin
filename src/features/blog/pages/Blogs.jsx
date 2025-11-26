import { useBlogs } from '../hooks/useBlogs';
import { Helmet } from 'react-helmet-async';
import { FaPlus } from 'react-icons/fa6';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';

export default function Blogs() {
  const { blogs, isLoadingBlogs, isErrorBlogs } = useBlogs();

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
        ]}
      />
      <PageHeading>Blogs</PageHeading>
      <a
        className="absolute bottom-10 right-10 bg-primary-600 hover:bg-primary-700 cursor-pointer duration-300 p-4 text-white text-2xl rounded-full"
        href="/blogs/create"
      >
        <FaPlus />
      </a>
    </>
  );
}
