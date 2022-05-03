import React, {ChangeEvent} from 'react';
import {Button} from './Button/Button';
import {FullInput} from './FullInput/FullInput';
import {EditableSpan} from '../EditableSpan/EditableSpan';

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
    changeTodolistName: (todolistId: string, newTitle: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
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
                                                     filter,
                                                     changeTodolistName,
                                                     changeTaskTitle
                                                 }) => {

    const allBtnClasses = filter === 'all' ? 'active-filter' : '';
    const activeBtnClasses = filter === 'active' ? 'active-filter' : '';
    const completedBtnClasses = filter === 'completed' ? 'active-filter' : '';


    const tasksList = tasks.map((task) => {

        const onClickButtonHandler = () => removeTask(todolistID, task.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked);
        const taskClass = task.isDone ? 'is-done' : '';

        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(todolistID, task.id, newTitle);
        }

        return (
            <li className={taskClass}
                key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <EditableSpan title={task.title} callback={changeTaskTitleHandler}/>
                <Button name={'x'} callback={onClickButtonHandler}/>
            </li>
        )
    });

    const tasksListChanged = tasksList.length ? tasksList : <div>Нет никаких задач</div>

    const onClickHandler = (filter: FilterValuesType) => {
        changeFilter(todolistID, filter);
    }

    const removeTodolistHandler = () => {
        removeToDoList(todolistID);
    }

    const addTaskHandler = (newTitle: string) => {
        addTask(todolistID, newTitle);
    }

    const changeTodolistNameHandler = (newTitle: string) => {
        changeTodolistName(todolistID, newTitle);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={changeTodolistNameHandler}/>
                <Button name={'x'} callback={removeTodolistHandler}/>
            </h3>
            <FullInput callback={addTaskHandler} buttonName={'+'}/>
            <ul>
                {tasksListChanged}
            </ul>
            <div>
                <Button className={allBtnClasses} name={'All'} callback={() => onClickHandler('all')}/>
                <Button className={activeBtnClasses} name={'Active'} callback={() => onClickHandler('active')}/>
                <Button className={completedBtnClasses} name={'Completed'}
                        callback={() => onClickHandler('completed')}/>
            </div>
        </div>
    )
}
