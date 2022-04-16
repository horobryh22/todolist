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
                <Button name={'x'} callback={onClickButtonHandler}/>
            </li>
        )
    });

    const onClickHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    // const addTaskHandler = (taskName: string): void => {
    //     addTask(taskName);
    // }


    const onClickButtonHandler = (inputValue: string) => {
        const trimmedTitle = inputValue.trim();
        if (trimmedTitle) addTask(inputValue);
        setInputValue('');
    }

    return (
        <div>
            <h3>{title}</h3>
            {/*<FullInput callback={addTaskHandler} buttonName={'+'}/>*/}
            <Input inputValue={inputValue} setInputValue={setInputValue}/>
            <Button name={'+'} callback={() => onClickButtonHandler(inputValue)}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button name={'All'} callback={() => onClickHandler('all')}/>
                <Button name={'Active'} callback={() => onClickHandler('active')}/>
                <Button name={'Completed'} callback={() => onClickHandler('completed')}/>
            </div>
        </div>
    )
}
