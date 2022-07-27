import { REQUEST_STATUS } from 'enums';
import { FilterValuesType, TodolistType } from 'types';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: REQUEST_STATUS;
};
