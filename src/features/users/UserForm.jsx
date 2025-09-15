import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useJwtData } from '../../services/jwt';
import toast from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumb';
import FormRow from '../../components/FormElements/FormRow';
import Input from '../../components/FormElements/Input';
import Label from '../../components/FormElements/Label';
import PageHeading from '../../components/PageHeading';
import Select from '../../components/FormElements/Select';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import DeleteButton from '../../components/Buttons/DeleteButton';
import Loading from '../../components/Loading';
import { useDeleteUser } from './useDeleteUser';
import { useUpdateUser } from './useUpdateUser';
import { useCreateUser } from './useCreateUser';
import { useGetUser } from './useGetUser';

export default function UserForm({ type = 'create' }) {
  const { username } = useParams();
  const isUpdate = type === 'update';

  const { deleteUser, isDeleting } = useDeleteUser(username);
  const { updateUser, isUpdating } = useUpdateUser();
  const { createUser, isCreating } = useCreateUser();
  const { user, isLoading } = useGetUser(
    type === 'create' ? undefined : username
  );

  const jwtData = useJwtData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      role: 'agent', // sensible default
      status: 'ACTIVE',
      password: '',
      passwordConfirm: '',
    },
  });

  useEffect(() => {
    if (type === 'update' && user) {
      reset({
        name: user.name ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        role: user.role ?? 'agent',
        status: user.status ?? 'ACTIVE',
        password: '',
        passwordConfirm: '',
      });
    }
  }, [isUpdate, user, reset]);

  useEffect(() => {
    if (jwtData?.role?.toLowerCase() !== 'admin') {
      toast.error('You are not allowed to access this page');
      navigate('/dummy-tickets');
    }
  }, [jwtData, navigate]);

  const submitLabel = useMemo(
    () =>
      isCreating || isUpdating || isSubmitting ? 'Submitting...' : 'Submit',
    [isCreating, isUpdating, isSubmitting]
  );

  function onSubmit(form) {
    const payload = { ...form };
    if (isUpdate && !payload.password && !payload.passwordConfirm) {
      delete payload.password;
      delete payload.passwordConfirm;
    }

    if (type === 'create') {
      createUser(payload);
    } else {
      updateUser({ username, userData: payload });
    }
  }

  if (isLoading && isUpdate) return <Loading />;

  const passwordValue = watch('password');

  return (
    <>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
          {
            label: isUpdate ? 'Update User' : 'Create User',
            href: '/users',
          },
        ]}
      />
      <PageHeading>{isUpdate ? 'Update User' : 'Create User'}</PageHeading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-md px-10 py-6"
      >
        <FormRow>
          <Label>Name</Label>
          <Input
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </FormRow>

        <FormRow>
          <Label>Username</Label>
          <Input
            type="text"
            disabled={isUpdate} // optional: disallow changing username on update
            {...register('username', { required: 'Username is required' })}
          />
          {errors?.username?.message && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
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
          {errors?.email?.message && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </FormRow>

        <FormRow>
          <Label>Role</Label>
          <Select {...register('role', { required: 'Role is required' })}>
            {[
              { label: 'Admin', value: 'admin' },
              { label: 'Agent', value: 'agent' },
            ].map((el) => (
              <option value={el.value} key={el.value}>
                {el.label}
              </option>
            ))}
          </Select>
          {errors?.role?.message && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
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
          {errors?.status?.message && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </FormRow>

        <FormRow>
          <Label>Password</Label>
          <Input
            type="password"
            autoComplete="new-password"
            {...register('password', {
              required: type === 'create' ? 'Password is required' : false,
              minLength: passwordValue
                ? {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  }
                : undefined,
            })}
          />
          {errors?.password?.message && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </FormRow>

        <FormRow>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            autoComplete="new-password"
            {...register('passwordConfirm', {
              required:
                type === 'create' ? 'Confirm Password is required' : false,
              validate: (val) =>
                passwordValue && val !== passwordValue
                  ? 'Passwords do not match'
                  : true,
            })}
          />
          {errors?.passwordConfirm?.message && (
            <p className="text-red-500 text-sm">
              {errors.passwordConfirm.message}
            </p>
          )}
        </FormRow>

        <div className="flex items-center gap-2.5 mt-5">
          <PrimaryButton
            type="submit"
            disabled={isCreating || isUpdating || isSubmitting}
          >
            {submitLabel}
          </PrimaryButton>

          {isUpdate && username && (
            <DeleteButton
              type="button"
              disabled={isUpdating || isDeleting}
              onClick={() => {
                if (confirm('Are you sure you want to delete this user?')) {
                  deleteUser(username);
                }
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
