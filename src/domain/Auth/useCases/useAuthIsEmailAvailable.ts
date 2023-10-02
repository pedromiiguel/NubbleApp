import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param {
  email: string;
  enabled: boolean;
}

export function useAuthIsEmailAvailable({email, enabled}: Param) {
  const debouncedEmail = useDebounce(email, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [QueryKeys.IsUserNameAvailable, debouncedEmail],
    queryFn: () => authService.isEmailAvailable(debouncedEmail),
    retry: false,
    staleTime: 20000,
  });

  const isDeboucing = debouncedEmail !== email;

  return {
    isAvailable: !!data,
    isUnavailable: data === false,
    isFetching: isDeboucing || isFetching,
    enabled: enabled && debouncedEmail.length > 0,
  };
}
