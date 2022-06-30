import {TasksType} from '../ToDoList/TodoList';
import React, {ChangeEvent, useCallback} from 'react';
import {useTypedDispatch} from '../../hooks/hooks';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../reducers/action-creators/action-creators';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeTaskTC} from '../../reducers/tasks-reducer';

export type TaskPropsType = {
    todolistId: string
    task: TasksType
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {

    const dispatch = useTypedDispatch();
    const {
        changeTaskStatusAC: changeTaskStatus,
        changeTaskTitleAC: changeTaskTitle,
    } = bindActionCreators(actionCreators, dispatch);


    const onClickButtonHandler = useCallback(() => {
        dispatch(removeTaskTC(todolistId, task.id))
    }, [task.id, todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
    }, [task.id, todolistId]);

    const taskClass = task.isDone ? 'is-done' : '';

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle);
    }, [task.id, todolistId]);

    return (
        <li className={taskClass} style={{listStyleType: 'none'}}
            key={task.id}>
            <Checkbox checked={task.isDone} size="small" onChange={onChangeHandler}/>
            <EditableSpan title={task.title} callback={changeTaskTitleHandler}/>
            <IconButton onClick={onClickButtonHandler} color="primary">
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </li>
    )
})