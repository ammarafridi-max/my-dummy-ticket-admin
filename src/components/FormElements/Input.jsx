import styled from 'styled-components';

const StyledInput = styled.input`
  background-color: var(--grey-color-100);
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 3px;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

export default function Input({ value, type, id, placeholder, min, max, onChange, disabled }) {
  return (
    <StyledInput
      onChange={onChange}
      value={value}
      type={type}
      id={id}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
    />
  );
}
