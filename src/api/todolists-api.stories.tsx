import React, {useEffect, useState} from 'react'
import {todolistAPI} from './todolist-api';

export default {
    title: 'Todolist/API/TodolistAPI'
}

const todolistId = 'ebd2859e-aab4-477e-962f-df542d9c926d';
const taskId = ' bd5ae865-dc11-494e-b022-597972198ec5';

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {

        todolistAPI.getTodolists()
            .then((res) => {
                console.log(res)
                setState(res.data);
            })

    }, []);

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('Hello')
            .then((res) => {
                setState(res.data.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistAPI.deleteTodolist('e0f1b15e-a59d-4a55-948b-201b79c090cf')
            .then((res) => {
                setState(res.data);
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist('ed206893-d6df-4ab6-81fd-ec76088c6727', 'Salam, Vasya')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {

        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data.items.map(i => i.title + ' ' + i.id).join(' ')));

    }, []);

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {

        todolistAPI.createTask(todolistId, 'I need to go')
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {

        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))

    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.updateTask(todolistId, taskId, 'Hey, Vasya')
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}