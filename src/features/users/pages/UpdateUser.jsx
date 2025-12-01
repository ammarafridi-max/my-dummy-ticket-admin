import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetUser } from '../hooks/useGetUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import UserForm from '../components/UserForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';

export default function UpdateUser() {
  const { username } = useParams();
  const { user, isLoading } = useGetUser(username);
  const { updateUser, isUpdating } = useUpdateUser();

  const { register, handleSubmit, reset, watch } = useForm();

  function onSubmit(data) {
    const payload = { ...data };
    delete payload.password;
    delete payload.passwordConfirm;

    updateUser({ username, userData: payload });
  }

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        role: user.role ?? 'agent',
        status: user.status ?? 'ACTIVE',
        password: '',
      });
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Update User</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
          { label: 'Update User', href: '/users/create' },
        ]}
      />
      <PageHeading>Update User</PageHeading>
      <UserForm
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        watch={watch}
        user={user}
        isLoading={isUpdating}
      />
    </>
  );
}
