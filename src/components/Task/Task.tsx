import React, {ChangeEvent, useCallback} from 'react';
import {useTypedDispatch} from '../../hooks/hooks';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from '../../reducers/tasks-reducer';
import {TaskStatus, TaskType} from '../../api/todolist-api';

export type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {

    const dispatch = useTypedDispatch();

    const onClickButtonHandler = useCallback(() => {
        dispatch(removeTaskTC(todolistId, task.id))
    }, [task.id, todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
        dispatch(updateTaskStatusTC(task.id, todolistId, status));
    }, [task.id, todolistId]);

    const taskClass = task.status === TaskStatus.Completed ? 'is-done' : '';

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTitleTC(task.id, todolistId, newTitle));
    }, [task.id, todolistId]);

    return (
        <li className={taskClass} style={{listStyleType: 'none'}}
            key={task.id}>
            <Checkbox checked={task.status === TaskStatus.Completed} size="small" onChange={onChangeHandler}/>
            <EditableSpan title={task.title} callback={changeTaskTitleHandler}/>
            <IconButton onClick={onClickButtonHandler} color="primary">
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </li>
    )
})