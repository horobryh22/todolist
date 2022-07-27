import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from 'hooks';
import {REQUEST_STATUS, TASK_STATUS} from 'enums';
import {EditableSpan} from 'components';
import {TaskPropsType} from './types';
import {removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from 'store/middlewares';


export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {

    const dispatch = useAppDispatch();

    const disabledCondition = task.entityStatus === REQUEST_STATUS.LOADING;

    const taskClass = task.status === TASK_STATUS.Completed ? 'is-done' : '';

    const onClickButtonHandler = useCallback(() => {
        dispatch(removeTaskTC(todolistId, task.id))
    }, [task.id, todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TASK_STATUS.Completed : TASK_STATUS.New;
        dispatch(updateTaskStatusTC(task.id, todolistId, status));
    }, [task.id, todolistId]);


    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTitleTC(task.id, todolistId, newTitle));
    }, [task.id, todolistId]);

    return (
        <li className={taskClass} style={{listStyleType: 'none'}}
            key={task.id}>
            <Checkbox checked={task.status === TASK_STATUS.Completed} size="small"
                      onChange={onChangeHandler}
                      disabled={disabledCondition}/>
            <EditableSpan title={task.title} callback={changeTaskTitleHandler}
                          disabled={disabledCondition}/>
            <IconButton onClick={onClickButtonHandler} color="primary"
                        disabled={disabledCondition}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </li>
    )
})