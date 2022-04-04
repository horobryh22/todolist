import React, {useState} from 'react';
import './App.css';
import {ToDoList, TasksType, FilterValuesType} from './TodoList';


function App() {

    const todoListTitle: string = 'What to do';

    const [tasks, setTasks] = useState <Array<TasksType>> ([
        {id: 1, title: 'Sleep', isDone: true},
        {id: 2, title: 'Eat', isDone: true},
        {id: 3, title: 'Doing', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (taskId: number) => {
        const changedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(changedTasks);
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.isDone;
        if (filter === 'active') return !task.isDone;
    })

    const changeFilter = (filter: FilterValuesType) => {
        setFilter((filter));
        console.log(filter);
    }


    return (
        <div className="App">
            <ToDoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
            />
        </div>
    );
}

export default App;
