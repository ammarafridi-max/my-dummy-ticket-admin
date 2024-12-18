import styled from "styled-components";

const StyledIconWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export default function IconWithText({ icon, text, className }) {
  return (
    <StyledIconWithText>
      {icon}
      <span className={className}>{text}</span>
    </StyledIconWithText>
  );
}
