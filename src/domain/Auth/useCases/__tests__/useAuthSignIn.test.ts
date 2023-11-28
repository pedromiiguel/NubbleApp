import {renderHook} from '@testing-library/react-native';
import {AllTheProviders, waitFor} from 'test-utils';

import {authService} from '../../authService';
import {useAuthSignIn} from '../useAuthSignIn';

import {mockedAuthCredentials} from './mockedData/mocks';
describe('useAuthSignIn', () => {
  const mockedOnSuccess = jest.fn();

  it('saves credentials if the sign-in successfully', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials);

    const {result} = renderHook(
      () => useAuthSignIn({onSuccess: mockedOnSuccess}),
      {
        wrapper: AllTheProviders,
      },
    );

    result.current.signIn({email: 'pedro@email.com', password: '123456'});

    await waitFor(() => expect(result.current.isSuccess).toEqual(true));
    expect(mockedOnSuccess).toHaveBeenCalledWith(mockedAuthCredentials);
  });
  it('calls the onError function with a message if sign-in fails', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValue(new Error('invalid user'));

    const mockedOnError = jest.fn();

    const {result} = renderHook(() => useAuthSignIn({onError: mockedOnError}), {
      wrapper: AllTheProviders,
    });

    result.current.signIn({email: 'pedro@email.com', password: '123456'});

    await waitFor(() => expect(result.current.isError).toEqual(true));

    expect(mockedOnError).toHaveBeenCalledWith('invalid user');
  });
});
