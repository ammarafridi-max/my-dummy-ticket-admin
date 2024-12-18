import styled from 'styled-components';

const StyledSelect = styled.select`
  background-color: var(--grey-color-200);
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 3px;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

export default function Select({
  children,
  value,
  id,
  placeholder,
  min,
  max,
  onChange,
  disabled,
  defaultValue,
}) {
  return (
    <StyledSelect
      onChange={onChange}
      value={value}
      id={id}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      {children}
    </StyledSelect>
  );
}
