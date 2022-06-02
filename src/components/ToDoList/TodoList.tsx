import React, {ChangeEvent, useCallback, useMemo} from 'react';
import {FullInput} from './FullInput/FullInput';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTypedDispatch, useTypedSelector} from '../../hooks/hooks';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../reducers/action-creators/action-creators';

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

export const ToDoList: React.FC<ToDoListType> = React.memo(({
                                                                title,
                                                                todolistID,
                                                                filter
                                                            }) => {

    const dispatch = useTypedDispatch();
    const {
        removeTaskAC: removeTask,
        changeTaskStatusAC: changeTaskStatus,
        changeTaskTitleAC: changeTaskTitle,
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

        const onClickButtonHandler = () => removeTask(todolistID, task.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistID, task.id, e.currentTarget.checked);
        }
        const taskClass = task.isDone ? 'is-done' : '';

        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(todolistID, task.id, newTitle);
        }

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
    });

    const tasksListChanged = tasksList.length ? tasksList : <div>Нет никаких задач</div>

    const onClickHandler = useCallback((filter: FilterValuesType) => {
        changeFilter(todolistID, filter);
    }, [changeFilter,todolistID]);

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistID);
    }, [removeTodolist, todolistID]);

    const addTaskHandler = useCallback((newTitle: string) => {
        addTask(todolistID, newTitle);
    }, [addTask, todolistID]);

    const changeTodolistNameHandler = useCallback((newTitle: string) => {
        changeTodolistName(todolistID, newTitle);
    }, [changeTodolistName, todolistID]);

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
                    onClick={() => onClickHandler('all')}
                >All</Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    size={'small'}
                    color={filter === 'active' ? 'error' : 'inherit'}
                    onClick={() => onClickHandler('active')}
                >Active</Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    size={'small'}
                    color={filter === 'completed' ? 'success' : 'inherit'}
                    onClick={() => onClickHandler('completed')}
                >Completed</Button>
            </div>
        </div>
    )
})

