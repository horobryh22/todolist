import { RootState } from 'store/types';

export const selectIsLoggedIn = (state: RootState): boolean => {
    return state.auth.isLoggedIn;
};
