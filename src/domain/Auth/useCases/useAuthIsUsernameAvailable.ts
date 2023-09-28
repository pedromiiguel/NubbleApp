import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param {
  username: string;
  enabled: boolean;
}

export function useAuthIsUsernameAvailable({username, enabled}: Param) {
  const debouncedUsername = useDebounce(username, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [QueryKeys.IsUserNameAvailable, debouncedUsername],
    queryFn: () => authService.isUserNameAvailable(debouncedUsername),
    retry: false,
    staleTime: 20000,
  });

  const isDeboucing = debouncedUsername !== username;

  return {
    isAvailable: !!data,
    isUnavailable: data === false,
    isFetching: isDeboucing || isFetching,
    enabled: enabled && debouncedUsername.length > 0,
  };
}
