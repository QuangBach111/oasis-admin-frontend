/* eslint-disable react/prop-types */
import PageButton from "./PageButton";


function PaginationPage({ totalPages, currentPage, onClick }) {
  return (
    <>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .map(pageNumber => (
          <PageButton
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onClick(pageNumber)}
          >
            {pageNumber}
          </PageButton>
        ))}
    </>
  );
}

export default PaginationPage;
