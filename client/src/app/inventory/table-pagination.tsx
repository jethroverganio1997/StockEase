"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  handlePageChange: (pageNumber: number) => void
  pageIndex: number; // current page
  pageCount: number; // total number of pages
}

export default function TablePagination({
  pageCount,
  pageIndex,
  handlePageChange,
}: 
TablePaginationProps) {
  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= pageCount - 1 && i <= pageCount + 1)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              isActive={pageIndex === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === pageIndex - 2 || i === pageIndex + 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(1, pageIndex - 1))}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(Math.min(pageCount, pageIndex + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
