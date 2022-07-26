import {RootState} from 'store/types';

export const selectIsLoggedIn = (state: RootState) => {
    return state.auth.isLoggedIn;
}
