import { AppDispatch, RootState } from 'store/types';

export type ThunkConfigType = {
    dispatch: AppDispatch;
    rejectValue: null;
    state: RootState;
};
