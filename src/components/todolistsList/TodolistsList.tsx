import React, { useCallback, useEffect } from 'react';

import { Grid, Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { Todolist, FullInput } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addTodolistTC, fetchTodolistsTC } from 'store/middlewares';
import { selectIsLoggedIn, selectTodolists } from 'store/selectors';
import { ReturnComponentType } from 'types';

export const TodolistsList = (): ReturnComponentType => {
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(selectTodolists);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistTC(todolistTitle));
    }, []);

    const mappedTodolists = todolists.map(tl => {
        return (
            <Grid item xs={3} key={tl.id}>
                <Paper elevation={8} style={{ padding: '20px' }}>
                    <Todolist todolist={tl} key={tl.id} />
                </Paper>
            </Grid>
        );
    });

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC());
        }
    }, []);

    if (!isLoggedIn) return <Navigate to="/login" />;

    return (
        <>
            <Grid container justifyContent="center" item xs={12}>
                <FullInput disabled={false} callback={addTodolist} buttonName="+" />
            </Grid>
            <Grid container spacing={2} style={{ paddingTop: '40px' }}>
                {mappedTodolists}
            </Grid>
        </>
    );
};
