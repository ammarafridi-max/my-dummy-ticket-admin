import styled from 'styled-components';
import Input from './Input';
import Label from './Label';
import Select from './Select';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  gap: 10px;
`;

export default function SelectWithLabel({
  children,
  htmlFor,
  label,
  value,
  placeholder,
  min,
  max,
  onChange,
  id,
  disabled,
  defaultValue,
}) {
  return (
    <StyledContainer>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Select
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
    </StyledContainer>
  );
}
