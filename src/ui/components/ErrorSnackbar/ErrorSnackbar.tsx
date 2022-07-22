import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {setAppError} from '../../../bll/redux/reducers/app-reducer/app-reducer';
import {useAppDispatch} from 'hooks';
import {useAppSelector} from 'hooks/useTypedSelector/useTypedSelector';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {

    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError(null));
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