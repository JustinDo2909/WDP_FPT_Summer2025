import React from 'react';
import { cn } from "@/lib/utils"; // Tailwind helper for conditional classNames
import { Begin } from '@/lib/by/Div';

interface CirclePaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

const CirclePagination: React.FC<CirclePaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
  const {page, totalPages} = pagination

  return (
    <Begin className="flex items-center gap-3 pb-4 justify-center">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-9 h-9 rounded-full border border-black flex items-center justify-center text-base transition",
            page === pagination.page ? "bg-pink-300 text-black" : "bg-white hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next Arrow */}
      <button
        onClick={() => {
          if (page < totalPages) onPageChange(page + 1);
        }}
        className="w-6 h-6 rounded-full border border-black flex items-center justify-center hover:bg-gray-100"
      >
        &gt;
      </button>
    </Begin>
  );
};

export default CirclePagination;
