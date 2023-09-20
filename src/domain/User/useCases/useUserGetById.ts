import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {userService} from '../userService';

export function useUserGetById(id: number) {
  const {data, isLoading, isError, refetch, isRefetching} = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => userService.getById(id),
  });

  return {
    user: data,
    isError,
    isLoading,
    refetch,
    isRefetching,
  };
}
