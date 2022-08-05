import { v1 } from 'uuid';

import { REQUEST_STATUS } from 'enums';
import { todolistsReducer } from 'store';
import {
    addTodolistTC,
    removeTodolistTC,
    updateTodolistTitleTC,
} from 'store/middlewares';
import { changeFilter, setTodolistEntityStatus } from 'store/reducers';
import { TodolistDomainType } from 'store/reducers/types';
import { FilterValuesType } from 'types';

let startState: Array<TodolistDomainType>;
let todolistId1: string;
let todolistId2: string;
let newTodolistTitle: string;
let newFilter: FilterValuesType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = 'New Title';
    newFilter = 'completed';

    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            order: 1,
            addedDate: '',
            entityStatus: REQUEST_STATUS.IDLE,
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            order: 1,
            addedDate: '',
            entityStatus: REQUEST_STATUS.IDLE,
        },
    ];
});

test('correct todolists should be removed', () => {
    const endState = todolistsReducer(
        startState,
        removeTodolistTC.fulfilled(todolistId1, '', todolistId1),
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolists should be added', () => {
    const todolist = {
        addedDate: '',
        id: v1(),
        order: 1,
        title: newTodolistTitle,
    };
    const endState = todolistsReducer(
        startState,
        addTodolistTC.fulfilled(todolist, '', newTodolistTitle),
    );

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolists should change its name', () => {
    const payload = {
        todolistId: todolistId2,
        data: {
            title: newTodolistTitle,
        },
    };
    const endState = todolistsReducer(
        startState,
        updateTodolistTitleTC.fulfilled(payload, '', payload),
    );

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(startState).not.toEqual(endState);
});

test('correct filter of todolists should be changed', () => {
    const endState = todolistsReducer(
        startState,
        changeFilter({
            todolistId: todolistId2,
            filter: newFilter,
        }),
    );

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolists should be changed', () => {
    const endState = todolistsReducer(
        startState,
        setTodolistEntityStatus({
            entityStatus: REQUEST_STATUS.LOADING,
            todolistId: todolistId2,
        }),
    );

    expect(endState[0].entityStatus).toBe(REQUEST_STATUS.IDLE);
    expect(endState[1].entityStatus).toBe(REQUEST_STATUS.LOADING);
});
