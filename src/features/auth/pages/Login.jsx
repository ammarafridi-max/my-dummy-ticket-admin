import { Helmet } from 'react-helmet-async';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login | Emirates Limo Admin</title>
      </Helmet>
      <LoginForm />
    </>
  );
}
