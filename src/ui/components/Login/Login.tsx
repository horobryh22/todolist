import React from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, FormLabel,
    Grid,
    TextField
} from '@mui/material';
import {useFormik} from 'formik';
import {loginTC} from 'bll/redux/reducers/auth-reducer/auth-reducer';
import {useTypedDispatch, useTypedSelector} from 'bll/hooks/hooks';
import {Navigate} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export type FormikInitialValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

const validate = (values: FormikInitialValuesType) => {
    const errors: FormikErrorType = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length <= 2) {
        errors.password = 'You need to enter min 2 symbols'
    }

    return errors
}

export const Login = () => {

    const dispatch = useTypedDispatch();

    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    })

    if (isLoggedIn) return <Navigate to={'/'}/>

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'} rel="noreferrer"> here
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
                            {formik.touched.email && formik.errors.email ? <div
                                style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? <div
                                style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'}
                                              control={
                                                  <Checkbox
                                                      checked={formik.values.rememberMe}
                                                      {...formik.getFieldProps('rememberMe')}
                                                  />}
                            />
                            <Button type={'submit'} variant={'contained'}
                                    color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
