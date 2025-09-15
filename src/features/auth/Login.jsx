import { useEffect, useState } from 'react';
import { useLogin } from './useLogin';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Input from '../../components/FormElements/Input';
import PageHeading from '../../components/PageHeading';
import Cookies from 'universal-cookie';
import Label from '../../components/FormElements/Label';

const StyledContainer = styled.div`
  width: 27%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const cookie = new Cookies();
  const jwtCookie = cookie.get('jwt');

  function handleSubmit(e) {
    e.preventDefault();
    login({ username, password });
  }

  useEffect(() => {
    jwtCookie && navigate('/');
  }, [jwtCookie]);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-full h-dvh flex flex-col items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] flex flex-col bg-white py-10 px-10 rounded-lg shadow-md"
        >
          <div className="mb-2">
            <Label className="mb-3">Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoggingIn}
              $mb="10px"
            />
          </div>
          <div className="mb-7">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoggingIn}
              $mb="10px"
            />
          </div>
          <PrimaryButton mt="10px" disabled={isLoggingIn}>
            Submit
          </PrimaryButton>
        </form>
      </div>
    </>
  );
}
