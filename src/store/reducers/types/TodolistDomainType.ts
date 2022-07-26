import {FilterValuesType, TodolistType} from 'types';
import {REQUEST_STATUS} from 'enums';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: REQUEST_STATUS
}