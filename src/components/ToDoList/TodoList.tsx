import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from './Button/Button';
import {Input} from './Input/Input';

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
    addTask: (todolistID: string, taskName: string) => void
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    removeToDoList: (todolistID: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList: React.FC<ToDoListType> = ({
                                                     title,
                                                     tasks,
                                                     changeTaskStatus,
                                                     removeTask,
                                                     changeFilter,
                                                     addTask,
                                                     removeToDoList,
                                                     todolistID,
                                                     filter
                                                 }) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const allBtnClasses = filter === 'all' ? 'active-filter' : '';
    const activeBtnClasses = filter === 'active' ? 'active-filter' : '';
    const completedBtnClasses = filter === 'completed' ? 'active-filter' : '';


    const tasksList = tasks.map((task) => {

        const onClickButtonHandler = () => removeTask(todolistID, task.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked);
        const taskClass = task.isDone ? 'is-done' : '';

        return (
            <li className={taskClass} key={task.id}><input type="checkbox" checked={task.isDone}
                                                           onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <Button name={'x'} callback={onClickButtonHandler}/>
            </li>
        )
    });
    const tasksListChanged = tasksList.length ? tasksList : <div>Нет никаких задач</div>

    const onClickHandler = (filter: FilterValuesType) => {
        changeFilter(todolistID, filter);
    }

    const onClickButtonHandler = (inputValue: string) => {
        const trimmedTitle = inputValue.trim();
        if (trimmedTitle) {
            addTask(todolistID, inputValue);
            setError(null);
        } else {
            setError('Text is wrong');
        }
        setInputValue('');
    }

    const removeTodolistHandler = () => {
        removeToDoList(todolistID);
    }

    return (
        <div>
            <h3>
                {title}
                <Button name={'x'} callback={removeTodolistHandler}/>
            </h3>
            <Input inputValue={inputValue} setInputValue={setInputValue} error={error} setError={setError}/>
            <Button name={'+'} callback={() => onClickButtonHandler(inputValue)}/>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {tasksListChanged}
            </ul>
            <div>
                <Button className={allBtnClasses}  name={'All'} callback={() => onClickHandler('all')}/>
                <Button className={activeBtnClasses} name={'Active'} callback={() => onClickHandler('active')}/>
                <Button className={completedBtnClasses} name={'Completed'}
                        callback={() => onClickHandler('completed')}/>
            </div>
        </div>
    )
}
