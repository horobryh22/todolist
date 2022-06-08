import React, {useCallback, useMemo} from 'react';
import {FullInput} from './FullInput/FullInput';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTypedDispatch, useTypedSelector} from '../../hooks/hooks';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../reducers/action-creators/action-creators';
import {Task} from '../Task/Task';

type ToDoListType = {
    title: string
    filter: FilterValuesType
    todolistID: string
}
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList: React.FC<ToDoListType> = React.memo(({title, todolistID, filter}) => {

    console.log('Todolist called')

    const dispatch = useTypedDispatch();

    const {
        addTaskAC: addTask,
        removeToDoListAC: removeTodolist,
        changeFilterAC: changeFilter,
        changeTodolistNameAC: changeTodolistName
    } = bindActionCreators(actionCreators, dispatch);

    const tasks = useTypedSelector(state => state.tasks[todolistID]);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filter === 'completed') return task.isDone;
            if (filter === 'active') return !task.isDone;
            return true;
        })
    }, [filter, tasks]);

    const tasksList = filteredTasks.map((task) => {
        return <Task todolistId={todolistID} task={task} key={task.id}/>
    });

    const tasksListChanged = tasksList.length ? tasksList : <div>Нет никаких задач</div>;

    const onClickHandler = useCallback((filter: FilterValuesType) => {
        changeFilter(todolistID, filter);
    }, [todolistID]);

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistID);
    }, [todolistID]);

    const addTaskHandler = useCallback((newTitle: string) => {
        addTask(todolistID, newTitle);
    }, [todolistID]);

    const changeTodolistNameHandler = useCallback((newTitle: string) => {
        changeTodolistName(todolistID, newTitle);
    }, [todolistID]);

    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={changeTodolistNameHandler}/>
                <IconButton onClick={removeTodolistHandler} color="primary">
                    <DeleteIcon fontSize="medium"/>
                </IconButton>
            </h3>
            <FullInput callback={addTaskHandler} buttonName={'+'}/>
            <ul style={{padding: '0'}}>
                {tasksListChanged}
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    size={'small'}
                    color={filter === 'all' ? 'primary' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('all'), [])}
                >All</Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    size={'small'}
                    color={filter === 'active' ? 'error' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('active'), [])}
                >Active</Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    size={'small'}
                    color={filter === 'completed' ? 'success' : 'inherit'}
                    onClick={useCallback(() => onClickHandler('completed'), [])}
                >Completed</Button>
            </div>
        </div>
    )
})

