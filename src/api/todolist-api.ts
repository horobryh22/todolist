import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'de6874e6-cce6-4779-a943-116ce67f7800'
    }
})

export type TodolistDomainType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type TaskDomainType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type ResponseGetTasksType = {
    error: null | string
    items: Array<TaskDomainType>
    totalCount: number
}

export type UpdateTaskModelType = {    /// исправить типы!!!!
    title: string
    startDate: any
    priority: any
    description: any
    deadline: any
    status: any
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title}
        );
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTodolists() {
        return instance.get<Array<TodolistDomainType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistDomainType }>>('todo-lists', {title});
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseGetTasksType>(`todo-lists/${todolistId}/tasks`, {
            params: {
                count: 10,
                page: 1
            }
        })
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskDomainType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
