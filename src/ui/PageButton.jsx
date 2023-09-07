import styled from "styled-components";


const PageButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};

  padding: 0 10px;
  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
export default PageButton;