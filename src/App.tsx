import React, {useReducer} from 'react';
import './App.css';
import {ToDoList, FilterValuesType, TasksType} from './components/ToDoList/TodoList';
import {v1} from 'uuid';
import {FullInput} from './components/ToDoList/FullInput/FullInput';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import {Container, css, Grid, Paper, styled} from '@mui/material';

import {
    ActionTypesReducer,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, createTasksAC, deleteTasksAC,
    removeTaskAC,
    tasksReducer
} from './reducers/tasks-reducer';

import {
    ActionTypesTodolists,
    addTodolistAC,
    changeFilterAC,
    changeTodolistNameAC,
    removeToDoListAC, todolistsReducer,
} from './reducers/todolists-reducer';


type StyledPaperProps = {
    primary?: boolean
}

const StyledPaper = styled(Paper, {})<StyledPaperProps>`
  background-color: red;
  ${props => props.primary && css`
    background: #4dad4d;
    color: black;
  `}
`;

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type TodolistsReducerType = (state: Array<TodoListType>, action: ActionTypesTodolists) => Array<TodoListType>;
export type TasksReducerType = (state: TasksStateType, action: ActionTypesReducer) => TasksStateType;

export const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todolists, todolistsDispatch] = useReducer<TodolistsReducerType>(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, tasksDispatch] = useReducer<TasksReducerType>(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    const addTodolist = (todolistTitle: string) => {
        const id = v1();
        todolistsDispatch(addTodolistAC(todolistTitle, id));
        tasksDispatch(createTasksAC(id));
    }
    const removeToDoList = (todolistID: string) => {
        tasksDispatch(deleteTasksAC(todolistID));
        todolistsDispatch(removeToDoListAC(todolistID));
    }
    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        todolistsDispatch(changeFilterAC(todolistID, filter));
    }
    const changeTodolistName = (todolistId: string, newTitle: string) => {
        todolistsDispatch(changeTodolistNameAC(todolistId, newTitle));
    }

    const addTask = (todolistID: string, taskName: string): void => {
        tasksDispatch(addTaskAC(todolistID, taskName))
    }
    const removeTask = (todolistID: string, taskId: string): void => {
        tasksDispatch(removeTaskAC(todolistID, taskId));
    }
    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistID, taskId, isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        tasksDispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Grid
                        container
                        justifyContent="center"
                        item xs={12}>
                        <FullInput
                            callback={addTodolist}
                            buttonName={'+'}
                        />
                    </Grid>
                    <Grid container spacing={2} style={{paddingTop: '40px'}}>
                        {todolists.map(tl => {

                            const filteredTasks = tasks[tl.id].filter((task) => {
                                if (tl.filter === 'all') return true;
                                if (tl.filter === 'completed') return task.isDone;
                                if (tl.filter === 'active') return !task.isDone;
                            })

                            return (

                                <Grid item xs={3} key={tl.id}>
                                    <StyledPaper primary elevation={8} style={{padding: '20px'}}>
                                        <ToDoList
                                            title={tl.title}
                                            addTask={addTask}
                                            filter={tl.filter}
                                            todolistID={tl.id}
                                            tasks={filteredTasks}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            removeToDoList={removeToDoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTodolistName={changeTodolistName}
                                        />
                                    </StyledPaper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

