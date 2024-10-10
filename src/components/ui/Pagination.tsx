import React from "react";

interface PaginationWithPageSizeProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PaginationWithPageSize: React.FC<PaginationWithPageSizeProps> = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between my-4 w-full px-5">
      <div>
        <label htmlFor="perPage" className="mr-2">
          Items per page:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationWithPageSize;
