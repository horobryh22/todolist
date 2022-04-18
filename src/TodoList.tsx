import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from './components/Button';
import {FullInput} from './components/FullInput';
import {Input} from './components/Input';

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
    addTask: (taskName: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
    changeTaskStatus: (taskId: string, isDone: boolean) => void
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
                                                     filter
                                                 }) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const allBtnClasses = filter === 'all' ? 'active-filter' : '';
    const activeBtnClasses = filter === 'active' ? 'active-filter' : '';
    const completedBtnClasses = filter === 'completed' ? 'active-filter' : '';


    const tasksList = tasks.map((task) => {

        const onClickButtonHandler = () => removeTask(task.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked);
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
        changeFilter(filter)
    }

    // const addTaskHandler = (taskName: string): void => {
    //     addTask(taskName);
    // }


    const onClickButtonHandler = (inputValue: string) => {
        const trimmedTitle = inputValue.trim();
        if (trimmedTitle) {
            addTask(inputValue);
            setError(null);
        } else {
            setError('Text is wrong');
        }
        setInputValue('');
    }

    return (
        <div>
            <h3>{title}</h3>
            {/*<FullInput callback={addTaskHandler} buttonName={'+'}/>*/}
            <Input inputValue={inputValue} setInputValue={setInputValue} error={error} setError={setError}/>
            <Button name={'+'} callback={() => onClickButtonHandler(inputValue)}/>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {tasksListChanged}
            </ul>
            <div>
                <Button classNameButton={allBtnClasses} name={'All'} callback={() => onClickHandler('all')}/>
                <Button classNameButton={activeBtnClasses} name={'Active'} callback={() => onClickHandler('active')}/>
                <Button classNameButton={completedBtnClasses} name={'Completed'}
                        callback={() => onClickHandler('completed')}/>
            </div>
        </div>
    )
}
