import React, {useState} from 'react';
import './App.css';
import {ToDoList, FilterValuesType} from './TodoList';
import {v1} from 'uuid';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map((t) => t.id === taskId ? {...t, isDone} : t)});
    }

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        const tl = todolists.map(tl => (tl.id === todolistID) ? {...tl, filter} : tl);
        setTodolists(tl);
    }

    return (
        <div className="App">
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
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        todolistID={tl.id}
                        removeToDoList={removeToDoList}
                    />
                )
            })}
        </div>
    );
}

