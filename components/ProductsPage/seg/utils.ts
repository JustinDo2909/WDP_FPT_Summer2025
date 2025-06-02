'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

/**
 * Custom hook to handle product search and sorting
 */
export function useProductSearch(searchQuery: string, sortOption: string | null) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) params.set("q", searchQuery);
    params.set("sort", sort);

    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", searchQuery);
      if (sortOption) params.set("sort", sortOption);

      router.push(`/products?${params.toString()}`);
    }
  };

  return {
    handleSortChange,
    handleSearch
  };
}

export const useAutoRefetch = (
  searchParams: ProductQueryParams,
  refetch: () => void,
  shouldFetch: boolean,
  excludeKeys: string[] = ['query']
) => {
  const prevParamsRef = useRef(searchParams);

  useEffect(() => {
    const prevFiltered = omit(prevParamsRef.current, excludeKeys);
    const currentFiltered = omit(searchParams, excludeKeys);
    
    if (!isEqual(prevFiltered, currentFiltered) && shouldFetch) {
      refetch();
    }

    prevParamsRef.current = searchParams;
  }, [searchParams, refetch, shouldFetch, excludeKeys]);
};


export const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'skincare', label: 'Chăm sóc da' },
  { value: 'treatment', label: 'Điều trị da' },
  { value: 'toner', label: 'Nước cân bằng' },
];

export const BRANDS = [
  { value: 'all', label: 'All Brands' },
  { value: 'larocheposay', label: 'La Roche-Posay' },
  { value: 'cerave', label: 'CeraVe' },
  { value: 'paulaschoice', label: "Paula's Choice" },
  { value: 'bioderma', label: 'Bioderma' },
  { value: 'somebymi', label: 'Some By Mi' },
  { value: 'acnes', label: 'Acnes' },
  { value: 'theordinary', label: 'The Ordinary' },
];

