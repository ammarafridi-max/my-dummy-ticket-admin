import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../utils/baseUrl';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import InputWithLabel from '../../components/FormElements/InputWithLabel';
import SelectWithLabel from '../../components/FormElements/SelectWithLabel';
import Row from '../../components/General/Row';
import PageHeading from '../../components/Typography/PageHeading';
import SectionHeading from '../../components/Typography/SectionHeading';
import Label from '../../components/FormElements/Label';
import Checkbox from '../../components/FormElements/Checkbox';

export default function CreateUser() {
  const navigate = useNavigate();
  const [testCheckbox, setTestCheckbox] = useState(false);
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'Admin',
    status: 'ACTIVE',
    testCheckbox,
  });
  const [permissions, setPermissions] = useState({
    updateDummyTicket: false,
    deleteDummyTicket: false,
    createUser: false,
    readUser: false,
    updateUser: false,
    deleteUser: false,
    readAmount: false,
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

  function handlePermissionsChange(e) {
    const { name } = e.target;
    setPermissions((prevState) => {
      return { ...prevState, [name]: !prevState[name] };
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
      <PageHeading>Create User</PageHeading>
      <Row gap="20px">
        <InputWithLabel value={user.name} onChange={handleChange} id="name" label="Name" />
        <InputWithLabel
          value={user.username}
          onChange={handleChange}
          id="username"
          label="Username"
        />
        <InputWithLabel value={user.email} onChange={handleChange} id="email" label="Email" />
      </Row>
      <Row gap="20px">
        <InputWithLabel
          value={user.password}
          onChange={handleChange}
          type="password"
          id="password"
          label="Password"
        />
        <SelectWithLabel value={user.role} label="Role" onChange={handleChange} id="role">
          {roles.map((role, i) => (
            <option key={i} value={role}>
              {role}
            </option>
          ))}
        </SelectWithLabel>
        <SelectWithLabel value={user.status} label="Status" onChange={handleChange} id="status">
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </SelectWithLabel>
      </Row>

      <SectionHeading mt="30px" mb="20px">
        Permissions
      </SectionHeading>

      <Row flexDirection="column" gap="10px">
        <label>
          <Checkbox
            type="checkbox"
            checked={permissions?.updateDummyTicket}
            onChange={handlePermissionsChange}
            name="updateDummyTicket"
          />
          <span>Allow user to update dummy tickets</span>
        </label>

        <label>
          <Checkbox
            type="checkbox"
            checked={permissions?.deleteDummyTicket}
            onChange={handlePermissionsChange}
            name="deleteDummyTicket"
          />
          <span>Allow user to delete dummy tickets</span>
        </label>

        <label>
          <Checkbox
            type="checkbox"
            checked={permissions?.createUser}
            onChange={handlePermissionsChange}
            name="createUser"
          />
          <span>Allow user to create users</span>
        </label>

        <label>
          <Checkbox
            type="checkbox"
            checked={permissions?.readUser}
            onChange={handlePermissionsChange}
            name="readUser"
          />
          <span>Allow user to read users</span>
        </label>

        <label>
          <Checkbox
            type="checkbox"
            checked={permissions?.updateUser}
            onChange={handlePermissionsChange}
            name="updateUser"
          />
          <span>Allow user to update users</span>
        </label>

        <label>
          <Checkbox
            type="checkbox"
            checked={permissions?.deleteUser}
            onChange={handlePermissionsChange}
            name="deleteUser"
          />
          <span>Allow user to delete users</span>
        </label>

        <label>
          <Checkbox
            type="checkbox"
            checked={permissions?.readAmount}
            onChange={handlePermissionsChange}
            name="readAmount"
          />
          <span>Allow user to view pricing</span>
        </label>
      </Row>

      <Row>
        <PrimaryButton mt="20px" onClick={handleSubmit}>
          Submit
        </PrimaryButton>
      </Row>
    </>
  );
}

const roles = ['Admin', 'Employee'];
