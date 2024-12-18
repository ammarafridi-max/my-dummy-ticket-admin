import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 11fr 1fr;
  align-items: center;
  gap: 5px;
  border: 1px solid rgb(230, 230, 230);
  width: 25%;
  padding: 0px 20px;
  border-radius: 100px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 10px 0;
`;

export default function SearchBar({ searchQuery, setSearchQuery, onChange }) {
  return (
    <StyledContainer>
      <StyledInput
        placeholder="Search..."
        onChange={onChange}
        value={searchQuery}
      />
      <CiSearch />
    </StyledContainer>
  );
}
