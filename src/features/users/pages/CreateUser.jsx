import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useCreateUser } from '../hooks/useCreateUser';
import UserForm from '../components/UserForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';

export default function CreateUser() {
  const { register, handleSubmit, watch } = useForm();
  const { createUser, isCreating } = useCreateUser();

  function onSubmit(data) {
    createUser(data);
  }

  return (
    <>
      <Helmet>
        <title>Create User</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
          { label: 'Create User', href: '/users/create' },
        ]}
      />
      <PageHeading>Create User</PageHeading>
      <UserForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} watch={watch} isLoading={isCreating} />
    </>
  );
}
