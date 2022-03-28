import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const ToDoListTitle_1: string = 'What to buy';
    const ToDoListTitle_2: string = 'What to learn';
    const ToDoListTitle_3: string = 'What to read';

    const tasks_1: TaskType[] = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
    ]

    const tasks_2: TaskType[] = [
        {id: 1, title: "Milk", isDone: true},
        {id: 2, title: "Sugar", isDone: true},
        {id: 3, title: "Salt", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList
                title = {ToDoListTitle_1}
                tasks = {tasks_1}
            />
            <TodoList
                title = {ToDoListTitle_2}
                tasks = {tasks_2}
            />
            {/*<TodoList title = {ToDoListTitle_3}/>*/}
        </div>
    );
}

export default App;
