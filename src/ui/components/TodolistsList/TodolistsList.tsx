import React, {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    getTodolistsTC
} from 'bll/redux/reducers/todolists-reducer/todolists-reducer';
import {css, Grid, Paper, styled} from '@mui/material';
import {Todolist} from 'ui/components/Todolist/Todolist';
import {FullInput} from 'ui/components/Todolist/FullInput/FullInput';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from 'hooks/useTypedSelector/useTypedSelector';
import {useAppDispatch} from 'hooks';

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

export const TodolistsList = () => {

    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle));
    }, []);

    const mappedTodolists = todolists.map(tl => {
        return (
            <Grid item xs={3} key={tl.id}>
                <StyledPaper primary={{hasDifferentStyle: true}} elevation={8}
                             style={{padding: '20px'}}>
                    <Todolist
                        todolist={tl}
                        key={tl.id}
                    />
                </StyledPaper>
            </Grid>
        )
    });

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodolistsTC());
        }
    }, []);

    if (!isLoggedIn) return <Navigate to={'/login'}/>

    return (
        <>
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
        </>
    );
};
