import React from 'react';
import './App.css';
import Task, {TasksType} from './TodoList';


function App() {

    const title_1: string = 'What to do';
    const title_2: string = 'What to buy';
    const title_3: string = 'What to learn';

    const task_1: TasksType[] = [
        {id: 1, title: 'Sleep', isCheked: true},
        {id: 2, title: 'Eat', isCheked: true},
        {id: 3, title: 'Doing', isCheked: false}

    ]

    const task_2: TasksType[] = [
        {id: 1, title: 'Milk', isCheked: true},
        {id: 2, title: 'Ice-cream', isCheked: true},
        {id: 3, title: 'Water', isCheked: false}

    ]

    const task_3: TasksType[] = [
        {id: 1, title: 'HTML', isCheked: true},
        {id: 2, title: 'JS', isCheked: true},
        {id: 3, title: 'React', isCheked: false}
    ]


    return (
        <div className="App">
            <Task
                title={title_1}
                tasks={task_1}
            />
            <Task
                title={title_2}
                tasks={task_2}
            />
            <Task
                title={title_3}
                tasks={task_3}
            />
        </div>
    );
}

export default App;
