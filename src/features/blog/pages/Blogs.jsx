import { capitalCase } from 'change-case';
import { useBlogs } from '../hooks/useBlogs';
import { Helmet } from 'react-helmet-async';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Table from '../../../components/Table';
import Loading from '../../../components/Loading';
import DangerPill from '../../../components/DangerPill';
import WarningPill from '../../../components/WarningPill';
import SuccessPill from '../../../components/SuccessPill';

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
      {isLoadingBlogs && <Loading />}
      {isErrorBlogs && <p>Error loading blogs</p>}
      {blogs && (
        <Table columnTemplate="2fr 3fr 2fr 2fr 1fr">
          <Table.Head>
            <Table.Heading>Created</Table.Heading>
            <Table.Heading>Title</Table.Heading>
            <Table.Heading>Slug</Table.Heading>
            <Table.Heading>Tags</Table.Heading>
            <Table.Heading textAlign="center">Status</Table.Heading>
          </Table.Head>
          {blogs?.map((blog) => (
            <Table.Row key={blog?._id} href={`/blogs/${blog?._id}`}>
              <Table.Item>{blog?.createdAt}</Table.Item>
              <Table.Item>{blog?.title}</Table.Item>
              <Table.Item>{blog?.slug}</Table.Item>
              <Table.Item>{blog?.tags?.map((tag) => capitalCase(tag)).join(', ')}</Table.Item>
              <Table.Item>
                {blog?.status === 'draft' && <WarningPill>{blog?.status?.toUpperCase()}</WarningPill>}
                {blog?.status === 'published' && <SuccessPill>{blog?.status?.toUpperCase()}</SuccessPill>}
              </Table.Item>
            </Table.Row>
          ))}
        </Table>
      )}

      <Link
        className="absolute bottom-10 right-10 bg-primary-600 hover:bg-primary-700 cursor-pointer duration-300 p-4 text-white text-2xl rounded-full"
        to="/blogs/create"
      >
        <FaPlus />
      </Link>
    </>
  );
}
