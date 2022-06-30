import {TasksType} from '../components/ToDoList/TodoList';
import * as actionCreators from './action-creators/action-creators';
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeToDoListAC,
    setTasksAC
} from './action-creators/action-creators';
import {AppDispatch, AppRootState} from '../redux/store';
import {todolistAPI} from '../api/todolist-api';

export type ActionTypesReducer =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof removeToDoListAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof actionCreators.setTodolistsAC>
    | ReturnType<typeof actionCreators.setTasksAC>;


export type TasksStateType = {
    [key: string]: Array<TasksType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypesReducer): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS':            // доработать вопрос с типами!!!!!
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(task => {
                    return {id: task.id, title: task.title, isDone: false}
                })
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]] as TasksType[]} //// зафиксить здесь также с типами!!!!!!
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.id]: []};
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.payload.todolistID];
            return copyState;
        case 'SET-TODOLISTS':
            const newState = {...state};
            action.payload.todolists.forEach((tl) => {
                newState[tl.id] = [];
            })
            return newState;
        default:
            return state;
    }
}

export const getTasksTC = (todolistId: string) => async (dispatch: AppDispatch) => {
    const response = await todolistAPI.getTasks(todolistId);
    const tasks = response.data.items;
    dispatch(setTasksAC(todolistId, tasks));
}

export const addTaskTC = (todolistId: string, title: string) => async (dispatch: AppDispatch) => {
    const response = await todolistAPI.createTask(todolistId, title);
    const task = response.data.data.item;
    dispatch(addTaskAC(task));
}

export const removeTaskTC = (todolistId: string, taskId: string) => async(dispatch: AppDispatch) => {
    const response = await todolistAPI.deleteTask(todolistId, taskId);
    if (!response.data.resultCode) {
        dispatch(removeTaskAC(todolistId, taskId));
    }
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: any) => { /// исправить!!!!!
    return (dispatch: AppDispatch, getState: () => AppRootState) => {

        const tasks = getState().tasks[todolistId];
        const task = tasks.find(t => {
            return t.id === taskId   /// чтобы все работало нужно изменить типы изначально в самом приложении!!!!!!!
        })

        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(todolistId, taskId, status)
                dispatch(action)
            })
        }
    }
}



