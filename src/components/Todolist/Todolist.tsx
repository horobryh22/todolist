import React, {useCallback, useEffect, useMemo} from 'react';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTypedDispatch, useTypedSelector} from '../../hooks/hooks';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../reducers/action-creators/action-creators';
import {Task} from '../Task/Task';
import {addTaskTC, getTasksTC} from '../../reducers/tasks-reducer';
import {TaskStatus} from '../../api/todolist-api';
import {
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from '../../reducers/todolists-reducer';
import {FullInput} from './FullInput/FullInput';

type TodolistPropsType = {
    todolist: TodolistDomainType
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({todolist}) => {

    const dispatch = useTypedDispatch();
    const disabledCondition = todolist.entityStatus === 'loading';

    const {changeFilterAC: changeFilter} = bindActionCreators(actionCreators, dispatch);

    const tasks = useTypedSelector(state => state.tasks[todolist.id]);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (todolist.filter === 'completed') return task.status === TaskStatus.Completed;
            if (todolist.filter === 'active') return task.status === TaskStatus.New;
            return true;
        })
    }, [todolist.filter, tasks]);

    const tasksList = filteredTasks.map((task) => {
        return <Task todolistId={todolist.id} task={task} key={task.id}/>
    });

    const tasksListChanged = tasksList.length ? tasksList : <div>Нет никаких задач</div>;

    const onClickHandler = useCallback((filter: FilterValuesType) => {
        changeFilter(todolist.id, filter);
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
                <EditableSpan title={todolist.title} callback={changeTodolistNameHandler}/>
                <IconButton
                    onClick={removeTodolistHandler}
                    color="primary"
                    disabled={disabledCondition}
                >
                    <DeleteIcon fontSize="medium"/>
                </IconButton>
            </h3>
            <FullInput callback={addTaskHandler} buttonName={'+'} disabled={disabledCondition}/>
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

