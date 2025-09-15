import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetMyAccount } from './useGetMyAccount';
import { useUpdateMyAccount } from './useUpdateMyAccount';
import FormRow from '../../components/FormElements/FormRow';
import Input from '../../components/FormElements/Input';
import Label from '../../components/FormElements/Label';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import PageHeading from '../../components/PageHeading';

export default function AccountForm() {
  const [updateMode, setUpdateMode] = useState(false);
  const { account, isLoading } = useGetMyAccount();
  const { updateAccount, isUpdating } = useUpdateMyAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      username: '',
    },
  });

  async function onSubmit(data) {
    try {
      await updateAccount(data);
      setUpdateMode(false);
    } catch {}
  }

  useEffect(() => {
    if (account) {
      reset({
        name: account?.name,
        email: account?.email,
        username: account?.username,
      });
    }
  }, [account, reset]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <PageHeading>My Account</PageHeading>
      <form
        className="bg-white px-10 py-6 rounded-lg shadow-md mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow>
          <Label>Name</Label>
          <Input
            type="text"
            disabled={isUpdating || !updateMode}
            {...register('name')}
          />
          <p>{errors?.name?.message}</p>
        </FormRow>
        <FormRow>
          <Label>Email</Label>
          <Input
            type="text"
            disabled={isUpdating || !updateMode}
            {...register('email')}
          />
          <p>{errors?.email?.message}</p>
        </FormRow>
        <FormRow>
          <Label>Username</Label>
          <Input
            type="text"
            disabled={isUpdating || !updateMode}
            {...register('username')}
          />
          <p>{errors?.username?.message}</p>
        </FormRow>
        <div className="flex items-center gap-2.5 mt-5">
          {/* <DeleteButton
            type="button"
            onClick={deleteAccount}
            disabled={isDeleting}
          >
            Delete Account
          </DeleteButton> */}
          {!updateMode && (
            <PrimaryButton type="button" onClick={() => setUpdateMode(true)}>
              Edit
            </PrimaryButton>
          )}
          {updateMode && (
            <PrimaryButton type="submit" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update'}
            </PrimaryButton>
          )}
        </div>
      </form>
    </>
  );
}
