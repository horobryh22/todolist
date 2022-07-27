import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid, LinearProgress} from '@mui/material';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'hooks';
import {ButtonAppBar, ErrorSnackbar, Login, TodolistsList} from 'components';
import {REQUEST_STATUS} from 'enums';
import {initializeAppTC} from 'store/middlewares';


export const App = () => {

    const dispatch = useAppDispatch();

    const status = useAppSelector(state => state.app.status);
    const isInitialized = useAppSelector(state => state.app.isInitialized);


    useEffect(() => {
        dispatch(initializeAppTC());
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            {status === REQUEST_STATUS.LOADING && <LinearProgress color="secondary"/>}
            <ButtonAppBar/>
            <Container fixed>
                <Grid container justifyContent={'center'}>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Grid>
                <ErrorSnackbar/>
            </Container>
        </div>
    )
}

