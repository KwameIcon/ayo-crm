import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages: (number | string)[] = [];

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    if (leftSibling > 1) {
      pages.push(1);
      if (leftSibling > 2) pages.push("...");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    if (rightSibling < totalPages) {
      if (rightSibling < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  const baseButton =
    "min-w-[36px] h-9 px-2 flex crm-bg-border items-center justify-center rounded-md text-sm font-medium transition";

  const normalButton =
    "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100";

  const activeButton =
    "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700";

  const disabledButton =
    "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-1 select-none my-7">
      {/* First */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`${baseButton} ${
          currentPage === 1 ? disabledButton : normalButton
        }`}
      >
        <ChevronFirst className="w-4 h-4" />
      </button>

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButton} ${
          currentPage === 1 ? disabledButton : normalButton
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="min-w-[36px] h-9 flex items-center justify-center text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(Number(page))}
            className={`${baseButton} ${
              page === currentPage ? activeButton : normalButton
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButton} ${
          currentPage === totalPages ? disabledButton : normalButton
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`${baseButton} ${
          currentPage === totalPages ? disabledButton : normalButton
        }`}
      >
        <ChevronLast className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;