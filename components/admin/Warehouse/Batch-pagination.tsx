"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Area, RText, Yard } from "@/lib/by/Div";

interface BatchPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function BatchPagination({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
  isLoading = false,
}: BatchPaginationProps) {
  // Safely handle potential undefined or invalid values
  const safePage = Math.max(1, currentPage || 1);
  const safeLimit = Math.max(1, limit || 10);
  const safeTotal = Math.max(0, total || 0);
  const safeTotalPages = Math.max(1, totalPages || 1);

  const startItem = (safePage - 1) * safeLimit + 1;
  const endItem = Math.min(safePage * safeLimit, safeTotal);

  const handlePrevPage = () => {
    if (safePage > 1) {
      onPageChange(safePage - 1);
    }
  };

  const handleNextPage = () => {
    if (safePage < safeTotalPages) {
      onPageChange(safePage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (safeTotalPages <= maxVisiblePages) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (safePage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, safePage - 1);
      const end = Math.min(safeTotalPages - 1, safePage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== safeTotalPages) {
          pages.push(i);
        }
      }

      if (safePage < safeTotalPages - 2) {
        pages.push("...");
      }

      // Show last page
      if (safeTotalPages > 1) {
        pages.push(safeTotalPages);
      }
    }

    return pages;
  };

  // Don't render if no data or only one page
  if (safeTotalPages <= 1 || safeTotal === 0) return null;

  return (
    <Yard className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
      {/* Results info */}
      <Area className="flex-1 flex justify-between sm:hidden">
        <RText className="text-sm text-gray-700">
          {isLoading
            ? "Loading..."
            : `${startItem}-${endItem} of ${safeTotal} results`}
        </RText>
      </Area>

      <Area className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <Yard>
          <RText className="text-sm text-gray-700">
            {isLoading
              ? "Loading..."
              : `Showing ${startItem} to ${endItem} of ${safeTotal} results`}
          </RText>
        </Yard>

        {/* Pagination controls */}
        <Yard>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {/* Previous button */}
            <button
              onClick={handlePrevPage}
              disabled={safePage <= 1 || isLoading}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) => (
              <span key={index}>
                {page === "..." ? (
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page as number)}
                    disabled={isLoading}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium disabled:cursor-not-allowed ${
                      safePage === page
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </span>
            ))}

            {/* Next button */}
            <button
              onClick={handleNextPage}
              disabled={safePage >= safeTotalPages || isLoading}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </Yard>
      </Area>
    </Yard>
  );
}
