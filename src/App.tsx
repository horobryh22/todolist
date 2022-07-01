import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {FullInput} from './components/Todolist/FullInput/FullInput';
import {ButtonAppBar} from './components/ButtonAppBar/ButtonAppBar';
import {Container, css, Grid, Paper, styled} from '@mui/material';
import {useTypedDispatch, useTypedSelector} from './hooks/hooks';
import {addTodolistTC, getTodolistsTC} from './reducers/todolists-reducer';

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

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle));
    }, []);

    const mappedTodolists = todolists.map(tl => {
        return (
            <Grid item xs={3} key={tl.id}>
                <StyledPaper primary={{hasDifferentStyle: true}} elevation={8} style={{padding: '20px'}}>
                    <Todolist
                        title={tl.title}
                        filter={tl.filter}
                        todolistID={tl.id}
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

