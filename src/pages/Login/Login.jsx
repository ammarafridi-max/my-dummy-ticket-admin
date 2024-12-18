import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Input from '../../components/FormElements/Input';
import PageHeading from '../../components/Typography/PageHeading';
import { AuthContext } from '../../context/AuthContext';
import { baseURL } from '../../utils/baseUrl';

const StyledContainer = styled.div`
  width: 25%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const credentials = { username, password };

  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const res = await fetch(`${baseURL}/api/admin/users/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const resData = await res.json();
      alert(resData.message);
      if (resData.status === 'success') {
        login(resData.data);
        alert('User has been logged in');
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <StyledContainer>
      <PageHeading mb="20px">Login</PageHeading>
      <Input
        placeholder="Email"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PrimaryButton mt="10px" onClick={handleSubmit}>
        Login
      </PrimaryButton>
    </StyledContainer>
  );
}
