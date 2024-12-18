import styled from "styled-components";
import { StyledNeutralPill } from "./NeutralPill";

const StyledDangerPill = styled(StyledNeutralPill)`
  color: #b03a2e;
  background-color: #fadbd8;
  width: ${({ width }) => width};
`;

export default function DangerPill({ children, width = "fit-content" }) {
  return <StyledDangerPill width={width}>{children}</StyledDangerPill>;
}
