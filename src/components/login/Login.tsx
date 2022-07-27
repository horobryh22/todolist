import React from 'react';

import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';
import { loginTC } from 'store/middlewares';
import { selectIsLoggedIn } from 'store/selectors';
import { ReturnComponentType } from 'types';
import { validate } from 'utils';

export const Login = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    });

    if (isLoggedIn) return <Navigate to="/" />;

    return (
        <Grid container justifyContent="center">
            <Grid item justifyContent="center">
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a
                                    href="https://social-network.samuraijs.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {' '}
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: 'red' }}>{formik.errors.email}</div>
                            ) : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: 'red' }}>
                                    {formik.errors.password}
                                </div>
                            ) : null}
                            <FormControlLabel
                                label="Remember me"
                                control={
                                    <Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                }
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
