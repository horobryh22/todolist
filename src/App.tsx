import React, {useState} from 'react';
import './App.css';
import {ToDoList, TasksType, FilterValuesType} from './TodoList';
import {v1} from 'uuid';


export const App = () => {

    const todoListTitle = 'What to do';

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'Sleep', isDone: true},
        {id: v1(), title: 'Eat', isDone: true},
        {id: v1(), title: 'Doing', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (taskId: string): void => {
        const changedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(changedTasks);
    }

    const addTask = (taskName: string): void => {
        const newTask = {
            id: v1(),
            title: taskName,
            isDone: false
        }
        setTasks([newTask, ...tasks]);
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.isDone;
        if (filter === 'active') return !task.isDone;
    })

    const changeFilter = (filter: FilterValuesType) => {
        setFilter((filter));
    }

    return (
        <div className="App">
            <ToDoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

