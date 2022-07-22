import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {logoutTC} from 'bll/redux/reducers/auth-reducer/auth-reducer';
import {useAppDispatch} from 'hooks';
import {useAppSelector} from 'hooks/useTypedSelector/useTypedSelector';

export const ButtonAppBar = React.memo(() => {

    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const onClickHandler = () => {
        dispatch(logoutTC());
    }

    return (
        <Box sx={{flexGrow: 1}} style={{marginBottom: '40px'}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button
                        color="inherit"
                        disabled={!isLoggedIn}
                        onClick={onClickHandler}
                    >Log out</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
})
