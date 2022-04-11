import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
    addTask: (taskName: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList: React.FC<ToDoListType> = ({title, tasks, removeTask, changeFilter, addTask}) => {

    const [inputValue, setInputValue] = useState<string>('');

    const tasksList = tasks.map((task) => {

        const onClickButtonHandler = () => removeTask(task.id);

        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickButtonHandler}>x</button>
            </li>
        )
    });

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value);
    }
    const onClickButtonHandler = (): void => {
        const trimmedTitle = inputValue.trim();
        if (trimmedTitle) addTask(inputValue);
        setInputValue('');
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        e.key === 'Enter' && onClickButtonHandler();
    }
    const onClickAllHandler = (): void => changeFilter('all');
    const onClickActiveHandler = (): void => changeFilter('active');
    const onClickCompletedHandler = (): void => changeFilter('completed');

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeInputHandler} value={inputValue} onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}
