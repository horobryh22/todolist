import React, {useState} from 'react';
import './App.css';
import {ToDoList, FilterValuesType, TasksType} from './components/ToDoList/TodoList';
import {v1} from 'uuid';
import {FullInput} from './components/ToDoList/FullInput/FullInput';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export const App = () => {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeToDoList = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID));
        delete tasks[todolistID];
    }

    const removeTask = (todolistID: string, taskId: string): void => {
        const changedTasks = tasks[todolistID].filter((task) => task.id !== taskId);
        setTasks({...tasks, [todolistID]: changedTasks});
    }

    const addTask = (todolistID: string, taskName: string): void => {
        const newTask = {
            id: v1(),
            title: taskName,
            isDone: false
        }
        const newObj = {...tasks, [todolistID]: [newTask, ...tasks[todolistID]]};
        setTasks(newObj);
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map((t) => t.id === taskId ? {...t, isDone} : t)});
    }

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        const tl = todolists.map(tl => (tl.id === todolistID) ? {...tl, filter} : tl);
        setTodolists(tl);
    }

    const addTodolist = (todolistTitle: string) => {
        const todolist: TodoListType  = {
            id: v1(),
            title: todolistTitle,
            filter: 'all'
        }
        setTodolists([todolist, ...todolists]);
        setTasks({...tasks, [todolist.id]: []});
    }

    const changeTodolistName = (todolistId: string, newTitle: string) => {
       setTodolists( todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t));
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)});
    }

    return (
        <div className="App">
            <FullInput callback={addTodolist} buttonName={'+'}/>
            {todolists.map(tl => {

                const filteredTasks = tasks[tl.id].filter((task) => {
                    if (tl.filter === 'all') return true;
                    if (tl.filter === 'completed') return task.isDone;
                    if (tl.filter === 'active') return !task.isDone;
                })

                return (
                    <ToDoList
                        key={tl.id}
                        title={tl.title}
                        addTask={addTask}
                        filter={tl.filter}
                        todolistID={tl.id}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        removeToDoList={removeToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistName = {changeTodolistName}
                    />
                )
            })}
        </div>
    );
}

