import {RootState} from 'store/types';

export const selectTodolists = (state: RootState) => {
    return state.todolists;
}
