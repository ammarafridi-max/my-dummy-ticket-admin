import styled from 'styled-components';
import Input from './Input';
import Label from './Label';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  gap: 10px;
`;

export default function InputWithLabel({
  htmlFor,
  label,
  value,
  placeholder,
  type,
  min,
  max,
  onChange,
  id,
  disabled,
}) {
  return (
    <StyledContainer>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={id}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
      />
    </StyledContainer>
  );
}
