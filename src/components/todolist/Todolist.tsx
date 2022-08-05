import React, { useCallback, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';

import { TodolistPropsType } from './types';

import { EditableSpan, FullInput, Task } from 'components';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
    addTaskTC,
    getTasksTC,
    removeTodolistTC,
    updateTodolistTitleTC,
} from 'store/middlewares';
import { changeFilter } from 'store/reducers';
import { selectFilteredTasksById } from 'store/selectors';
import { FilterValuesType } from 'types';

export const Todolist = React.memo(({ todolist }: TodolistPropsType) => {
    const dispatch = useAppDispatch();

    const disabledCondition = todolist.entityStatus === REQUEST_STATUS.LOADING;

    const tasks = useAppSelector(state =>
        selectFilteredTasksById(state, todolist.id, todolist.filter),
    );

    const tasksList = tasks.map(task => {
        return <Task todolistId={todolist.id} task={task} key={task.id} />;
    });

    const tasksListChanged = tasksList.length ? tasksList : <div>Нет никаких задач</div>;

    const onClickHandler = useCallback(
        (filter: FilterValuesType) => {
            dispatch(changeFilter({ todolistId: todolist.id, filter }));
        },
        [todolist.id],
    );

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(todolist.id));
    }, [todolist.id]);

    const addTaskHandler = useCallback(
        (newTitle: string) => {
            dispatch(addTaskTC({ todolistId: todolist.id, data: { title: newTitle } }));
        },
        [todolist.id],
    );

    const changeTodolistNameHandler = useCallback(
        (newTitle: string) => {
            dispatch(
                updateTodolistTitleTC({
                    todolistId: todolist.id,
                    data: { title: newTitle },
                }),
            );
        },
        [todolist.id],
    );

    useEffect(() => {
        dispatch(getTasksTC(todolist.id));
    }, []);

    return (
        <div>
            <h3>
                <EditableSpan
                    title={todolist.title}
                    callback={changeTodolistNameHandler}
                    disabled={disabledCondition}
                />
                <IconButton
                    onClick={removeTodolistHandler}
                    color="primary"
                    disabled={disabledCondition}
                >
                    <DeleteIcon fontSize="medium" />
                </IconButton>
            </h3>
            <FullInput
                callback={addTaskHandler}
                buttonName="+"
                disabled={disabledCondition}
            />
            <ul style={{ padding: '0' }}>{tasksListChanged}</ul>
            <div>
                <Button
                    variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    size="small"
                    color={todolist.filter === 'all' ? 'primary' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('all'), [])}
                >
                    All
                </Button>
                <Button
                    variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    size="small"
                    color={todolist.filter === 'active' ? 'error' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('active'), [])}
                >
                    Active
                </Button>
                <Button
                    variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    size="small"
                    color={todolist.filter === 'completed' ? 'success' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('completed'), [])}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});
