import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex space-x-2 py-4">
      <button
        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
          currentPage === 1
            ? "text- cursor-default"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold ${
            currentPage === pageNum
              ? "bg-custom-dark-blue text-white"
              : "text-gray-700 hover:bg-custom-dark-blue"
          }`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      <button
        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
          currentPage === totalPages
            ? "text-gray-400 cursor-default"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
