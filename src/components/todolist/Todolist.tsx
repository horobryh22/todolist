import React, {useCallback, useEffect, useMemo} from 'react';
import {EditableSpan, FullInput} from 'components';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from 'components';
import {useAppSelector} from 'hooks';
import {useAppDispatch} from 'hooks';
import {FilterValuesType} from 'types';
import {
    addTaskTC,
    changeFilter,
    getTasksTC,
    removeTodolistTC,
    updateTodolistTitleTC
} from 'store';
import {REQUEST_STATUS, TASK_STATUS} from 'enums';
import {TodolistPropsType} from './types';


export const Todolist: React.FC<TodolistPropsType> = React.memo(({todolist}) => {

    const dispatch = useAppDispatch();

    const disabledCondition = todolist.entityStatus === REQUEST_STATUS.LOADING;

    const tasks = useAppSelector(state => state.tasks[todolist.id]); //нужно исправить!!!

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (todolist.filter === 'completed') return task.status === TASK_STATUS.Completed;
            if (todolist.filter === 'active') return task.status === TASK_STATUS.New;
            return true;
        })
    }, [todolist.filter, tasks]);

    const tasksList = filteredTasks.map((task) => {
        return <Task todolistId={todolist.id} task={task} key={task.id}/>
    });

    const tasksListChanged = tasksList.length ? tasksList :
        <div>Нет никаких задач</div>;

    const onClickHandler = useCallback((filter: FilterValuesType) => {
        dispatch(changeFilter({todolistId: todolist.id, filter}))
    }, [todolist.id]);

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(todolist.id));
    }, [todolist.id]);

    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskTC(todolist.id, newTitle));
    }, [todolist.id]);

    const changeTodolistNameHandler = useCallback((newTitle: string) => {
        dispatch(updateTodolistTitleTC(todolist.id, newTitle));
    }, [todolist.id]);

    useEffect(() => {
        dispatch(getTasksTC(todolist.id));
    }, [])

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} callback={changeTodolistNameHandler}
                              disabled={disabledCondition}/>
                <IconButton
                    onClick={removeTodolistHandler}
                    color="primary"
                    disabled={disabledCondition}
                >
                    <DeleteIcon fontSize="medium"/>
                </IconButton>
            </h3>
            <FullInput callback={addTaskHandler} buttonName={'+'}
                       disabled={disabledCondition}/>
            <ul style={{padding: '0'}}>
                {tasksListChanged}
            </ul>
            <div>
                <Button
                    variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    size={'small'}
                    color={todolist.filter === 'all' ? 'primary' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('all'), [])}
                >All</Button>
                <Button
                    variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    size={'small'}
                    color={todolist.filter === 'active' ? 'error' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('active'), [])}
                >Active</Button>
                <Button
                    variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    size={'small'}
                    color={todolist.filter === 'completed' ? 'success' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('completed'), [])}
                >Completed</Button>
            </div>
        </div>
    )
})

