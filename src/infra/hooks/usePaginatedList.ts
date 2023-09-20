import {useEffect, useState} from 'react';

import {useInfiniteQuery} from '@tanstack/react-query';
import {Page} from '@types';

export interface UserPaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
): UserPaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({pageParam = 1}) => {
      console.log({pageParam});
      return getList(pageParam);
    },
    getNextPageParam: ({meta}) => {
      console.log({meta});
      return meta.hasNextPage ? meta.currentPage + 1 : null;
    },
  });
  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);
      setList(newList);
    }
  }, [query.data]);

  return {
    list,
    isLoading: query.isLoading,
    isError: query.isError,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
  };
}
