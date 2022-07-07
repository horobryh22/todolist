import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useTypedDispatch, useTypedSelector} from '../../hooks/hooks';
import {setAppErrorAC} from '../../reducers/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {

    const dispatch = useTypedDispatch();
    const error = useTypedSelector(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null));
    }
    return (
        <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}