import { Controller } from 'react-hook-form';
import { useState } from 'react';
import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Textarea from '../../../components/FormElements/Textarea';
import Label from '../../../components/FormElements/Label';
import CheckboxGroup from '../../../components/FormElements/CheckboxGroup';
import TinyEditor from '../../../components/TinyEditor';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import UploadFile from '../../../components/FormElements/UploadFile';

export default function BlogForm({ register, control, handleSubmit, onSubmit }) {
  const [coverImage, setCoverImage] = useState('');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md px-10 py-6 mt-5 flex flex-col gap-4">
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
        <UploadFile {...register('coverImage')} />
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
        <Controller
          name="content"
          control={control}
          render={({ field }) => <TinyEditor value={field.value} onChange={field.onChange} />}
        />
      </FormRow>
      <div className="flex items-center justify-end mt-5">
        <PrimaryButton type="submit">Create Blog</PrimaryButton>
      </div>
    </form>
  );
}
