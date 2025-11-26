import { useForm } from 'react-hook-form';
import { useUpdateMyPassword } from '../hooks/useUpdateMyPassword';
import styled from 'styled-components';
import FormRow from '../../../components/FormElements/FormRow';
import Label from '../../../components/FormElements/Label';
import Input from '../../../components/FormElements/Input';
import SectionHeading from '../../../components/SectionHeading';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import LinkButton from '../../../components/Buttons/LinkButton';

const Container = styled.div`
  margin-top: 80px;
`;

const BtnRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function PasswordForm() {
  const { updatePassword, isLoading } = useUpdateMyPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const { passwordCurrent, password, passwordConfirm } = data;
    updatePassword({ passwordCurrent, password, passwordConfirm });
  }

  return (
    <>
      <Container>
        <SectionHeading fontSize="28px" mb="40px">
          Update Your Password
        </SectionHeading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Label>Current Password</Label>
            <Input
              type="password"
              {...register('passwordCurrent', {
                required: 'Current password is required',
              })}
            />
            <p>{errors?.passwordCurrent?.message}</p>
          </FormRow>
          <FormRow>
            <Label>New Password</Label>
            <Input
              type="password"
              {...register('password', {
                required: 'New password is required',
              })}
            />
            <p>{errors?.password?.message}</p>
          </FormRow>
          <FormRow>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              {...register('passwordConfirm', {
                required: 'Password confirm is required',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            <p>{errors?.passwordConfirm?.message}</p>
          </FormRow>
          <BtnRow>
            <PrimaryButton type="submit" disabled={isLoading}>
              Update
            </PrimaryButton>
            <LinkButton type="button">Forgot Password?</LinkButton>
          </BtnRow>
        </form>
      </Container>
    </>
  );
}
