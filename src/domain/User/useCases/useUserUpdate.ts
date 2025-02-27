import {MutationOptions, QueryKeys} from '@infra';
import {useAuthCredentials} from '@services';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {userService} from '../userService';
import {UpdateUserParams, User} from '../userTypes';

export function useUserUpdate(options?: MutationOptions<User>) {
  const queryClient = useQueryClient();
  const {authCredentials, updateUser: updateAuthUser} = useAuthCredentials();

  const {mutate, isLoading} = useMutation<User, unknown, UpdateUserParams>({
    mutationFn: params => updateUser(params),
    retry: false,
    onError: () => {
      options?.onError?.('');
    },
    onSuccess: user => {
      queryClient.invalidateQueries([QueryKeys.UserGetById, user.id]);
      updateAuthUser(user);
      options?.onSuccess?.(user);
    },
  });

  async function updateUser(params: UpdateUserParams) {
    if (!authCredentials) {
      throw new Error('current user not found');
    }

    const user = await userService.updateUser(authCredentials.user, params);
    return user;
  }

  return {
    isLoading,
    updateUser: (params: UpdateUserParams) => mutate(params),
  };
}
