import { TodolistDomainType } from 'store/reducers';
import { RootState } from 'store/types';

export const selectTodolists = (state: RootState): TodolistDomainType[] => {
    return state.todolists;
};
