import { useState } from 'react';
import { baseURL } from '../../utils/baseUrl';
import Checkbox from '../../components/FormElements/Checkbox';
import InputWithLabel from '../../components/FormElements/InputWithLabel';
import Div from '../../components/General/Div';
import Row from '../../components/General/Row';
import PageHeading from '../../components/Typography/PageHeading';
import SectionHeading from '../../components/Typography/SectionHeading';
import SectionSubheading from '../../components/Typography/SectionSubheading';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

export default function CreateRole() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [permissions, setPermissions] = useState({
    dummyTickets: {
      read: true,
      update: true,
      delete: true,
    },
    users: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    roles: {
      create: false,
      read: true,
      update: true,
      delete: true,
    },
    others: {
      readAmount: false,
    },
  });

  function handleChange(e, type) {
    const { id } = e.target;
    setPermissions((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...prevState[type],
          [id]: !prevState[type][id],
        },
      };
    });
  }

  async function createRole(e) {
    try {
      e.preventDefault();
      const data = { name, slug, permissions };
      console.log(data);
      const res = await fetch(`${baseURL}/api/roles`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('An error occurred');
      const resData = await res.json();
      alert(resData.message);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <PageHeading>Create Role</PageHeading>
      <Row justifyContent="left" gap="20px">
        <InputWithLabel
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputWithLabel
          label="Slug"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </Row>

      <SectionHeading mt="40px" mb="30px">
        Permissions
      </SectionHeading>

      <Row justifyContent="left" alignItems="top" gap="20px" mb="30px">
        <Div width="33%">
          <SectionSubheading mb="15px">Dummy Tickets</SectionSubheading>
          <Row flexDirection="column" alignItems="top">
            <label>
              <Checkbox
                checked={permissions?.dummyTickets?.read}
                id="read"
                onChange={(e) => handleChange(e, 'dummyTickets')}
              />
              <span>Allow user to read dummy ticket data</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.dummyTickets?.update}
                id="update"
                onChange={(e) => handleChange(e, 'dummyTickets')}
              />
              <span>Allow user to update dummy ticket data</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.dummyTickets?.delete}
                id="delete"
                onChange={(e) => handleChange(e, 'dummyTickets')}
              />
              <span>Allow user to delete dummy ticket data</span>
            </label>
          </Row>
        </Div>

        <Div width="33%">
          <SectionSubheading mb="20px">Users</SectionSubheading>

          <Row flexDirection="column" alignItems="top">
            <label>
              <Checkbox
                checked={permissions?.users?.create}
                id="create"
                onChange={(e) => handleChange(e, 'users')}
              />
              <span>Allow user to create users</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.users?.read}
                id="read"
                onChange={(e) => handleChange(e, 'users')}
              />
              <span>Allow user to read user data</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.users?.update}
                id="update"
                onChange={(e) => handleChange(e, 'users')}
              />
              <span>Allow user to update user data</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.users?.delete}
                id="delete"
                onChange={(e) => handleChange(e, 'users')}
              />
              <span>Allow user to delete user</span>
            </label>
          </Row>
        </Div>

        <Div width="33%">
          <SectionSubheading mb="20px">Roles</SectionSubheading>
          <Row flexDirection="column" alignItems="top">
            <label>
              <Checkbox
                checked={permissions?.roles?.create}
                id="create"
                onChange={(e) => handleChange(e, 'roles')}
              />
              <span>Allow user to create roles</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.roles?.read}
                id="read"
                onChange={(e) => handleChange(e, 'roles')}
              />
              <span>Allow user to read role data</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.roles?.update}
                id="update"
                onChange={(e) => handleChange(e, 'roles')}
              />
              <span>Allow user to update role data</span>
            </label>
            <label>
              <Checkbox
                checked={permissions?.roles?.delete}
                id="delete"
                onChange={(e) => handleChange(e, 'roles')}
              />
              <span>Allow user to delete roles</span>
            </label>
          </Row>
        </Div>

        <Div width="33%">
          <SectionSubheading mb="20px">Other</SectionSubheading>
          <Row flexDirection="column" alignItems="top">
            <label>
              <Checkbox
                checked={permissions?.others?.readAmount}
                id="readAmount"
                onChange={(e) => handleChange(e, 'others')}
              />
              <span>Allow user to read amounts paid by customers</span>
            </label>
          </Row>
        </Div>
      </Row>

      <PrimaryButton onClick={createRole}>Submit</PrimaryButton>
    </>
  );
}
