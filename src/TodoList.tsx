import React from 'react';

type PropsType = {
    title: string
    tasks: TasksType[]
}

export type TasksType = {
    id: number,
    isCheked: boolean,
    title: string
}

const Task = ({title, tasks}: PropsType) => { // применили деструктуризацию в данном месте кода
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={tasks[0].isCheked}/> <span>{tasks[0].title}</span></li>
                <li><input type="checkbox" checked={tasks[1].isCheked}/> <span>{tasks[1].title}</span></li>
                <li><input type="checkbox" checked={tasks[2].isCheked}/> <span>{tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default Task;