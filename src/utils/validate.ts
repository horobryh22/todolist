import { FormikErrorType, FormikInitialValuesType } from 'components/login';

export const validate = (values: FormikInitialValuesType): FormikErrorType => {
    const errors: FormikErrorType = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length <= 2) {
        errors.password = 'You need to enter min 2 symbols';
    }

    return errors;
};
