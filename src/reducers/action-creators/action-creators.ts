import {TaskStatus, TaskType, TodolistType} from '../../api/todolist-api';
import {FilterValuesType} from '../todolists-reducer';

const removeToDoListAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
};
const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const
};
const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
};
const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const
};
const changeFilterAC = (todolistID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistID,
            filter
        }
    } as const
};
const changeTodolistNameAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-NAME',
        payload: {
            todolistId,
            newTitle
        }
    } as const
};
const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskId
        }
    } as const;
};
const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const;
};
const changeTaskStatusAC = (todolistID: string, taskId: string, status: TaskStatus) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskId,
            status
        }
    } as const;
};
const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const;
};

export {
    removeToDoListAC,
    addTodolistAC,
    changeFilterAC,
    changeTodolistNameAC,
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    setTodolistsAC,
    setTasksAC
}