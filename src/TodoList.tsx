import React from 'react';

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type FilterValuesType = 'all' | 'completed' | 'active';


export type TasksType = {
    id: number
    isDone: boolean
    title: string
}

export const ToDoList = ({title, tasks, removeTask, changeFilter}: PropsType) => { // применили деструктуризацию в данном месте кода

    const tasksList = tasks.map((task) => {
        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
            </li>
        )
    });

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
