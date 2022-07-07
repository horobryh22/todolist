import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {FullInput} from './components/Todolist/FullInput/FullInput';
import {ButtonAppBar} from './components/ButtonAppBar/ButtonAppBar';
import {Container, css, Grid, LinearProgress, Paper, styled} from '@mui/material';
import {useTypedDispatch, useTypedSelector} from './hooks/hooks';
import {addTodolistTC, getTodolistsTC} from './reducers/todolists-reducer';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';

type StyledPaperProps = {
    primary?: {
        hasDifferentStyle: boolean
    }
}

const StyledPaper = styled(Paper, {})<StyledPaperProps>`
  background-color: red;
  ${({primary: hasDifferentStyle}) => hasDifferentStyle && css`
    background: #4dad4d;
    color: black;
  `}
`;

export const App = () => {

    const dispatch = useTypedDispatch();
    const todolists = useTypedSelector(state => state.todolists);
    const status = useTypedSelector(state => state.app.status);

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle));
    }, []);

    const mappedTodolists = todolists.map(tl => {
        return (
            <Grid item xs={3} key={tl.id}>
                <StyledPaper primary={{hasDifferentStyle: true}} elevation={8} style={{padding: '20px'}}>
                    <Todolist
                        todolist={tl}
                        key={tl.id}
                    />
                </StyledPaper>
            </Grid>
        )
    });

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, []);

    return (
        <div>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Grid
                        container
                        justifyContent="center"
                        item xs={12}>
                        <FullInput
                            disabled={false}
                            callback={addTodolist}
                            buttonName={'+'}
                        />
                    </Grid>
                    <Grid container spacing={2} style={{paddingTop: '40px'}}>
                        {mappedTodolists}
                    </Grid>
                </Grid>
                <ErrorSnackbar/>
            </Container>
        </div>
    )
}

