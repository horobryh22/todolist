import React, {useCallback} from 'react';
import './App.css';
import {ToDoList} from './components/ToDoList/TodoList';
import {FullInput} from './components/ToDoList/FullInput/FullInput';
import {ButtonAppBar} from './components/ButtonAppBar/ButtonAppBar';
import {Container, css, Grid, Paper, styled} from '@mui/material';
import {useTypedDispatch, useTypedSelector} from './hooks/hooks';
import * as actionCreators from './reducers/action-creators/action-creators'
import {bindActionCreators} from 'redux';


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

export const App = () => {

    const dispatch = useTypedDispatch();
    const {addTodolistAC: addNewTodo} =  bindActionCreators(actionCreators, dispatch);
    const todolists = useTypedSelector(state => state.todolists);

    const addTodolist = useCallback((todolistTitle: string) => {
        addNewTodo(todolistTitle);
    }, [addNewTodo]);

    const mappedTodolists = todolists.map(tl => {
        return (
            <Grid item xs={3} key={tl.id}>
                <StyledPaper primary elevation={8} style={{padding: '20px'}}>
                    <ToDoList
                        title={tl.title}
                        filter={tl.filter}
                        todolistID={tl.id}
                    />
                </StyledPaper>
            </Grid>
        )
    });

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
                        {mappedTodolists}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

