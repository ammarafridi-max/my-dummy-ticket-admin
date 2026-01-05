import { capitalCase } from 'change-case';
import { useDeleteBlog } from '../hooks/useDeleteBlog';
import { format } from 'date-fns';
import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Textarea from '../../../components/FormElements/Textarea';
import Label from '../../../components/FormElements/Label';
import CheckboxGroup from '../../../components/FormElements/CheckboxGroup';
import UploadFile from '../../../components/FormElements/UploadFile';
import TinyEditor from '../../../components/TinyEditor';
import PrimaryButton from '../../../components/PrimaryButton';
import DeleteButton from '../../../components/DeleteButton';

export default function BlogForm({ blog, editorRef, register, control, handleSubmit, onSubmit, isLoading = false }) {
  const { deleteBlog, isDeletingBlog } = useDeleteBlog();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-[8fr_3fr] gap-6 mt-6">
      <div className="bg-white rounded-xl shadow p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-medium text-gray-800 pb-2">SEO Settings</h2>

          <FormRow>
            <Label>Meta Title</Label>
            <Input type="text" {...register('metaTitle')} />
          </FormRow>

          <FormRow>
            <Label>Meta Description</Label>
            <Textarea rows={2} {...register('metaDescription')} />
          </FormRow>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium text-gray-800 pb-2">Blog Details</h2>

          <FormRow>
            <Label>Title</Label>
            <Input type="text" {...register('title')} />
          </FormRow>

          <FormRow>
            <Label>Slug</Label>
            <Input type="text" {...register('slug')} />
          </FormRow>

          <FormRow>
            <Label>Cover Image</Label>
            <div className="flex flex-col gap-3 w-full">
              {blog?.coverImageUrl && (
                <div className="relative">
                  <img src={blog.coverImageUrl} className="w-full max-h-60 object-cover rounded-lg border" alt="Cover" />
                  <p className="text-xs text-gray-500 mt-1">Upload a new image to replace the current one</p>
                </div>
              )}
              <UploadFile {...register('coverImage')} />
            </div>
          </FormRow>

          <FormRow>
            <Label>Excerpt</Label>
            <Textarea rows={3} {...register('excerpt')} placeholder="A short summary of the blog..." />
          </FormRow>

          <FormRow>
            <Label>Tags</Label>
            <CheckboxGroup
              name="tags"
              control={control}
              options={[
                { value: 'dummyTicket', label: 'Dummy Ticket' },
                { value: 'schengenVisa', label: 'Schengen Visa' },
                { value: 'usVisa', label: 'US Visa' },
              ]}
            />
          </FormRow>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium text-gray-800 pb-2">Content</h2>

          <TinyEditor editorRef={editorRef} initialValue={blog?.content} />
        </section>
      </div>

      <aside className="bg-white h-fit rounded-xl shadow p-6 space-y-5">
        {blog?.createdAt && (
          <div className="leading-6 text-gray-600">
            <p className="font-normal">Created:</p>
            <p className="text-sm font-extralight">{format(blog.createdAt, 'dd MMM yyyy • hh:mm aa')}</p>
          </div>
        )}

        {blog?.updatedAt && (
          <div className="leading-6 text-gray-600">
            <p className="font-normal">Last Updated:</p>
            <p className="text-sm font-extralight">{format(blog.updatedAt, 'dd MMM yyyy • hh:mm aa')}</p>
          </div>
        )}

        {blog?.publishedAt && (
          <div className="leading-6 text-gray-600">
            <p className="font-normal">Published:</p>
            <p className="text-sm font-extralight">{format(blog.publishedAt, 'dd MMM yyyy • hh:mm aa')}</p>
          </div>
        )}

        {blog?.status && (
          <div className="leading-6 text-gray-600">
            <p className="font-normal">Status:</p>
            <p className="text-sm font-extralight">{capitalCase(blog.status)}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {blog ? (
            <DeleteButton
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
                  deleteBlog(blog._id);
                }
              }}
              disabled={isDeletingBlog || isLoading}
            >
              Delete
            </DeleteButton>
          ) : (
            <div></div>
          )}

          {blog?.status === 'draft' || blog?.status === 'archive' ? (
            <PrimaryButton type="submit" disabled={isLoading || isDeletingBlog} className="px-6">
              Publish
            </PrimaryButton>
          ) : blog?.status === 'published' ? (
            <PrimaryButton type="submit" disabled={isLoading || isDeletingBlog} className="px-6">
              Update
            </PrimaryButton>
          ) : (
            <PrimaryButton type="submit" disabled={isLoading || isDeletingBlog} className="px-6">
              Save
            </PrimaryButton>
          )}
        </div>
      </aside>
    </form>
  );
}
