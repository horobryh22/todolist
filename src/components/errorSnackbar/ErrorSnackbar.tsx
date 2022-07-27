import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { useAppDispatch, useAppSelector } from 'hooks';
import { setAppError } from 'store/reducers';
import { ReturnComponentType } from 'types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = (): ReturnComponentType => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null));
    };

    return (
        <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
};
