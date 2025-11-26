import { Helmet } from 'react-helmet-async';
import AccountForm from '../components/AccountForm';
import Breadcrumb from '../../../components/Breadcrumb';

export default function MyAccount() {
  return (
    <>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'My Account', href: '/account' },
        ]}
      />
      <Helmet>My Account</Helmet>
      <AccountForm />
      {/* <PasswordForm /> */}
    </>
  );
}
