import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {followService} from '../followService';

export function useFollowUser(options?: MutationOptions<void>) {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation({
    mutationFn: followService.followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MyFollowingList],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.UserGetById],
      });

      options?.onSuccess?.();
    },
    onError: () => {
      options?.onError?.(options.errorMessage || ' erro ao seguir usuario');
    },
  });

  function followUser(userId: number) {
    mutate(userId);
  }

  return {
    followUser,
    isLoading,
  };
}
