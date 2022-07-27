import { selectFilteredTasksById } from '../selectFilteredTasksById';
import { selectIsLoggedIn } from '../selectIsLoggedIn';
import { selectTodolists } from '../selectTodolists';

import { REQUEST_STATUS, TASK_PRIORITY, TASK_STATUS } from 'enums';
import { RootState } from 'store/types';
import { FilterValuesType } from 'types';

let state: RootState;
const todolistId = 'some id';
const filter: FilterValuesType = 'all';

beforeEach(() => {
    state = {
        tasks: {
            [todolistId]: [
                {
                    entityStatus: REQUEST_STATUS.IDLE,
                    title: 'Task title',
                    order: 0,
                    addedDate: '',
                    id: 'Task id',
                    status: TASK_STATUS.New,
                    startDate: '',
                    deadline: '',
                    description: '',
                    todoListId: todolistId,
                    priority: TASK_PRIORITY.Middle,
                },
                {
                    entityStatus: REQUEST_STATUS.IDLE,
                    title: 'Task title',
                    order: 0,
                    addedDate: '',
                    id: 'Task id',
                    status: TASK_STATUS.Completed,
                    startDate: '',
                    deadline: '',
                    description: '',
                    todoListId: todolistId,
                    priority: TASK_PRIORITY.Middle,
                },
            ],
            'another id': [],
        },
        auth: {
            isLoggedIn: false,
        },
        app: {
            error: null,
            status: REQUEST_STATUS.IDLE,
            isInitialized: false,
        },
        todolists: [
            {
                entityStatus: REQUEST_STATUS.IDLE,
                title: 'Some text',
                filter,
                id: todolistId,
                order: 0,
                addedDate: '',
            },
        ],
    };
});

describe('select', () => {
    test('IsLoggedIn', () => {
        const isLoggedIn = selectIsLoggedIn(state);

        expect(isLoggedIn).toBeFalsy();
    });

    test('todolists', () => {
        const todolists = selectTodolists(state);

        expect(todolists.length).toBe(1);
    });

    test('tasks', () => {
        const tasks = selectFilteredTasksById(state, todolistId, 'completed');

        expect(tasks.length).toBe(1);
    });
});

export {};
