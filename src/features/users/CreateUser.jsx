import { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRoles } from '../roles/useRoles';
import { baseURL } from '../../utils/baseUrl';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import InputWithLabel from '../../components/FormElements/InputWithLabel';
import SelectWithLabel from '../../components/FormElements/SelectWithLabel';
import Row from '../../components/General/Row';
import PageHeading from '../../components/Typography/PageHeading';
import { useUsers } from './useUsers';

export default function CreateUser() {
  const { username } = useParams();
  const { roles } = useRoles();
  const { currentUser } = useUsers(username);
  const endpoint = username ? `${baseURL}/api/users/${username}` : `${baseURL}/api/users`;
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'Admin',
    status: 'ACTIVE',
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      console.log(user);
      // const res = await fetch(`${baseURL}/api/admin/users`, {
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(user),
      // });
      // const resData = await res.json();
      // alert(resData.message);
      // navigate('/users');
    } catch (error) {
      // alert(error.message);
    }
  }

  return (
    <>
      <PageHeading>{username ? currentUser?.name : 'Create User'}</PageHeading>

      <Suspense fallback={<p>Loading...</p>}>
        <Form
          roles={roles}
          username={username}
          user={user}
          currentUser={currentUser}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Suspense>
    </>
  );
}

const Form = ({ username, currentUser, user, handleChange, roles, handleSubmit }) => {
  return (
    <>
      <Row gap="20px">
        <InputWithLabel
          value={username ? currentUser?.name : user.name}
          onChange={handleChange}
          id="name"
          label="Name"
        />
        <InputWithLabel
          value={username ? currentUser?.username : user.username}
          onChange={handleChange}
          id="username"
          label="Username"
        />
        <InputWithLabel
          value={username ? currentUser?.email : user.email}
          onChange={handleChange}
          id="email"
          label="Email"
        />
      </Row>
      <Row gap="20px">
        <InputWithLabel
          value={user.password}
          onChange={handleChange}
          type="password"
          id="password"
          label="Password"
        />
        <SelectWithLabel
          value={username ? currentUser?.password : user.role}
          label="Role"
          onChange={handleChange}
          id="role"
        >
          {roles?.map((role, i) => (
            <option key={i} value={role}>
              {role.name}
            </option>
          ))}
        </SelectWithLabel>
        <SelectWithLabel
          value={username ? currentUser?.status : user.status}
          label="Status"
          onChange={handleChange}
          id="status"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </SelectWithLabel>
      </Row>

      <Row>
        <PrimaryButton mt="20px" onClick={handleSubmit}>
          Submit
        </PrimaryButton>
      </Row>
    </>
  );
};
