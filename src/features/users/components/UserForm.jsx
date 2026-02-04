import { useParams } from 'react-router-dom';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useCreateUser } from '../hooks/useCreateUser';
import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Select from '../../../components/FormElements/Select';
import PrimaryButton from '../../../components/PrimaryButton';
import DeleteButton from '../../../components/DeleteButton';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

export default function UserForm({ user, register, handleSubmit, onSubmit, watch, isLoading }) {
  const { username } = useParams();

  const { deleteUser, isDeleting } = useDeleteUser(username);
  const { createUser, isCreating } = useCreateUser();

  const passwordValue = watch('password');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-10 py-6 mt-5 bg-white rounded-lg shadow-md ">
        <FormRow>
          <Label>Name</Label>
          <Input type="text" {...register('name', { required: 'Name is required' })} />
        </FormRow>

        <FormRow>
          <Label>Username</Label>
          <Input type="text" {...register('username', { required: 'Username is required' })} />
        </FormRow>

        <FormRow>
          <Label>Email</Label>
          <Input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
          />
        </FormRow>

        <FormRow>
          <Label>Role</Label>
          <Select {...register('role', { required: 'Role is required' })}>
            {[
              { label: 'Admin', value: 'admin' },
              { label: 'Agent', value: 'agent' },
              { label: 'Blog Manager', value: 'blog-manager' },
            ].map((el) => (
              <option value={el.value} key={el.value}>
                {el.label}
              </option>
            ))}
          </Select>
        </FormRow>

        <FormRow>
          <Label>Status</Label>
          <Select {...register('status', { required: 'Status is required' })}>
            {['ACTIVE', 'INACTIVE'].map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </Select>
        </FormRow>

        {!user && (
          <FormRow>
            <Label>Password</Label>
            <Input
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: 'Password is required',
                minLength: passwordValue
                  ? {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    }
                  : undefined,
              })}
            />
          </FormRow>
        )}

        {!user && (
          <FormRow>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              autoComplete="new-password"
              {...register('passwordConfirm', {
                required: 'Confirm Password is required',
                validate: (val) => (passwordValue && val !== passwordValue ? 'Passwords do not match' : true),
              })}
            />
          </FormRow>
        )}

        <div className="flex items-center gap-2.5 mt-5">
          <PrimaryButton type="submit" disabled={isLoading}>
            Submit
          </PrimaryButton>
          {user && (
            <DeleteButton
              type="button"
              disabled={isLoading || isDeleting}
              onClick={() => {
                confirmAlert({
                  title: 'Confirm to delete',
                  message: 'Are you sure you want to delete this user? This action cannot be undone.',
                  buttons: [
                    {
                      label: 'Delete',
                      onClick: () => deleteUser(username),
                    },
                    {
                      label: 'Cancel',
                      onClick: () => toast.error('Delete cancelled'),
                    },
                  ],
                });
              }}
            >
              Delete User
            </DeleteButton>
          )}
        </div>
      </form>
    </>
  );
}
