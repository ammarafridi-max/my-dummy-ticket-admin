import styled from "styled-components";
import { StyledNeutralPill } from "./NeutralPill";

const StyledSuccessPill = styled(StyledNeutralPill)`
  color: #196f3d;
  background-color: #d4efdf;
  width: ${({ width }) => width};
`;

export default function SuccessPill({ children, width = "fit-content" }) {
  return <StyledSuccessPill width={width}>{children}</StyledSuccessPill>;
}
