/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";

import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import styled from "styled-components";
import { useState } from "react";
import PaginationPage from './PaginationPage';
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ totalElements, pageNumber, pageSize, totalPages, onClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(pageNumber + 1);

  function nextPage() {
    if (currentPage === totalPages) return;

    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage === 1) return;

    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
    setCurrentPage(currentPage - 1);
  }

  function handleClickPageButton(pageNumber) {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
    setCurrentPage(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * pageSize + 1}</span> to <span>{currentPage === totalPages ? totalElements : currentPage * pageSize}</span> of <span>{totalElements}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronDoubleLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handleClickPageButton}
        />

        <PaginationButton onClick={nextPage} disabled={currentPage === totalPages}>
          <span>Next</span> <HiChevronDoubleRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
