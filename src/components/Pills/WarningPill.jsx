import styled from "styled-components";
import { StyledNeutralPill } from "./NeutralPill";

const StyledWarningPill = styled(StyledNeutralPill)`
  color: #b9770e;
  background-color: #fae5d3;
`;

export default function WarningPill({ children }) {
  return <StyledWarningPill>{children}</StyledWarningPill>;
}
