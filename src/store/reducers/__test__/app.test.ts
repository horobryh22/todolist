import { REQUEST_STATUS } from 'enums';
import { appReducer } from 'store';
import { initializeAppTC } from 'store/middlewares';
import { setAppError, setAppStatus } from 'store/reducers';
import { Nullable } from 'types';

let startState: {
    error: Nullable<string>;
    status: REQUEST_STATUS;
    isInitialized: boolean;
};

let error: string;

beforeEach(() => {
    error = 'some error';

    startState = {
        error: null,
        status: REQUEST_STATUS.IDLE,
        isInitialized: false,
    };
});

test('correct app status should be set', () => {
    const endState = appReducer(startState, setAppStatus(REQUEST_STATUS.LOADING));

    expect(endState.status).toBe(REQUEST_STATUS.LOADING);
    expect(endState.error).toBeNull();
});

test('the error should be set inside app state', () => {
    const endState = appReducer(startState, setAppError(error));

    expect(endState.error).toBe(error);
    expect(endState.status).toBe(REQUEST_STATUS.IDLE);
});

test('app should be initialized when initialization finished with mistake', () => {
    const endState = appReducer(startState, initializeAppTC.rejected);

    expect(endState.isInitialized).toBeTruthy();
});

test('app should be initialized when initialization finished with success', () => {
    const endState = appReducer(startState, initializeAppTC.fulfilled);

    expect(endState.isInitialized).toBeTruthy();
});
