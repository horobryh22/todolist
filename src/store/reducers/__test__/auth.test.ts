import { authReducer } from 'store';
import { loginTC, logoutTC } from 'store/middlewares';
import { AuthStateType } from 'store/reducers';

let startState: AuthStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false,
    };
});

test('if user is logged, value isLoggedIn should be true', () => {
    const endState = authReducer(startState, loginTC.fulfilled);

    expect(endState.isLoggedIn).toBeTruthy();
});

test('if user is logged out, value isLoggedIn should be false', () => {
    const endState = authReducer(startState, logoutTC.fulfilled);

    expect(endState.isLoggedIn).toBeFalsy();
});
