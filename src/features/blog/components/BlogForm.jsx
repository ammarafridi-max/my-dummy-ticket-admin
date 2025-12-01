import { capitalCase } from 'change-case';
import { useDeleteBlog } from '../hooks/useDeleteBlog';
import { format } from 'date-fns';
import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Textarea from '../../../components/FormElements/Textarea';
import Select from '../../../components/FormElements/Select';
import Label from '../../../components/FormElements/Label';
import CheckboxGroup from '../../../components/FormElements/CheckboxGroup';
import UploadFile from '../../../components/FormElements/UploadFile';
import TinyEditor from '../../../components/TinyEditor';
import PrimaryButton from '../../../components/PrimaryButton';
import DeleteButton from '../../../components/DeleteButton';

export default function BlogForm({ blog, editorRef, register, control, handleSubmit, onSubmit, isLoading = false }) {
  const { deleteBlog, isDeletingBlog } = useDeleteBlog();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md px-10 py-6 mt-5 flex flex-col gap-4">
      {blog?.createdAt && (
        <FormRow>
          <Label>Date Created</Label>
          <Input type="text" value={format(blog?.createdAt, 'dd MMM yyyy (hh:mm aa)')} readonly disabled />
        </FormRow>
      )}
      {blog?.updatedAt && (
        <FormRow>
          <Label>Last Updated</Label>
          <Input type="text" value={format(blog?.updatedAt, 'dd MMM yyyy (hh:mm aa)')} readonly disabled />
        </FormRow>
      )}
      <FormRow>
        <Label>Meta Title</Label>
        <Input type="text" {...register('metaTitle')} />
      </FormRow>
      <FormRow>
        <Label>Meta Description</Label>
        <Input type="text" {...register('metaDescription')} />
      </FormRow>
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
        {blog?.coverImageUrl ? (
          <img src={blog?.coverImageUrl} className="w-fit h-15 object-contain object-center border border-gray-300 rounded-sm" />
        ) : (
          <UploadFile {...register('coverImage')} />
        )}
      </FormRow>

      <FormRow>
        <Label>Excerpt</Label>
        <Textarea rows={3} maxLength={60} type="text" {...register('excerpt')} />
      </FormRow>
      <FormRow>
        <Label>Tag</Label>
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
      <FormRow>
        <Label>Content</Label>
        <TinyEditor editorRef={editorRef} value={blog?.content} />
      </FormRow>
      <FormRow>
        <Label>Status</Label>
        <Select {...register('status')} defaultValue={blog?.status}>
          {['draft', 'published'].map((opt, i) => (
            <option key={i} value={opt}>
              {capitalCase(opt)}
            </option>
          ))}
        </Select>
      </FormRow>
      <div className="flex items-center justify-end mt-5 gap-3">
        {blog && (
          <DeleteButton
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
                deleteBlog(blog?._id);
              }
            }}
            disabled={isDeletingBlog || isLoading}
          >
            Delete Blog
          </DeleteButton>
        )}
        <PrimaryButton type="submit" disabled={isLoading || isDeletingBlog}>
          {blog ? 'Update Blog' : 'Create Blog'}
        </PrimaryButton>
      </div>
    </form>
  );
}
