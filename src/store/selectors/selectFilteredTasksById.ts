import { createSelector } from '@reduxjs/toolkit';

import { TASK_STATUS } from 'enums';
import { TaskStateType } from 'store/reducers';
import { RootState } from 'store/types';
import { FilterValuesType } from 'types';

const selectTasks = (state: RootState): TaskStateType => state.tasks;
const selectTodolistData = (
    state: RootState,
    todolistId: string,
    filter: FilterValuesType,
): { todolistId: string; filter: FilterValuesType } => ({
    todolistId,
    filter,
});

export const selectFilteredTasksById = createSelector(
    [selectTasks, selectTodolistData],
    (tasks, { todolistId, filter }) =>
        tasks[todolistId].filter(task => {
            if (filter === 'completed') return task.status === TASK_STATUS.Completed;
            if (filter === 'active') return task.status === TASK_STATUS.New;

            return true;
        }),
);
