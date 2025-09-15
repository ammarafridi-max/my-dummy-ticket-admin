import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../utils/baseUrl';
import InputWithLabel from '../components/FormElements/InputWithLabel';
import SelectWithLabel from '../components/FormElements/SelectWithLabel';
import Row from '../components/General/Row';
import PageHeading from '../components/Typography/PageHeading';
import DeleteButton from '../components/Buttons/DeleteButton';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SuccessButton from '../components/Buttons/SuccessButton';

export default function ReadUser() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteUser() {
    try {
      const isConfirmed = confirm(
        `Are you sure you want to delete user ${username}`
      );
      if (!isConfirmed) return;
      const res = await fetch(`${baseURL}/api/admin/users/${username}`, {
        method: 'delete',
      });
      const resData = await res.json();
      alert(resData.message);
      navigate('/users');
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${baseURL}/api/admin/users/${username}`);
        const resData = await res.json();
        setUser(resData.data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <PageHeading>{user?.name}</PageHeading>
      <Row gap="20px" mb="20px">
        <InputWithLabel
          value={user?.name}
          onChange={handleChange}
          id="name"
          label="Name"
          disabled={!isEditing}
        />
        <InputWithLabel
          value={user?.username}
          onChange={handleChange}
          id="username"
          label="Username"
          disabled={!isEditing}
        />
        <InputWithLabel
          value={user?.email}
          onChange={handleChange}
          id="email"
          label="Email"
          disabled={!isEditing}
        />
      </Row>
      <Row gap="20px" mb="20px">
        <InputWithLabel
          value={user?.newPassword}
          onChange={handleChange}
          type="password"
          id="newPassword"
          label="New Password"
          disabled={!isEditing}
        />
        <SelectWithLabel
          value={user?.role}
          label="Role"
          onChange={handleChange}
          id="role"
          disabled={!isEditing}
        >
          {roles.map((role, i) => (
            <option key={i} value={role}>
              {role}
            </option>
          ))}
        </SelectWithLabel>
        <SelectWithLabel
          value={user?.status}
          label="Status"
          onChange={handleChange}
          id="status"
          disabled={!isEditing}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </SelectWithLabel>
      </Row>
      <Row gap="10px" justifyContent="left">
        <DeleteButton onClick={deleteUser}>Delete User</DeleteButton>
        <PrimaryButton onClick={() => setIsEditing((state) => !state)}>
          Edit User
        </PrimaryButton>
        {isEditing && (
          <SuccessButton onClick={handleSubmit}>Submit</SuccessButton>
        )}
      </Row>
    </>
  );
}

const roles = ['Admin', 'Employee'];
