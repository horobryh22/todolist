import {appReducer, AppStateType, REQUEST_STATUS, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: AppStateType;
let error: string;

beforeEach(() => {

    error = 'some error';

    startState = {
        error: null,
        status: REQUEST_STATUS.IDLE,
        isInitialized: false
    }

})

test('correct app status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC(REQUEST_STATUS.LOADING));

    expect(endState.status).toBe(REQUEST_STATUS.LOADING);
    expect(endState.error).toBeNull();
});

test('the error should be set inside app state', () => {
    const endState = appReducer(startState, setAppErrorAC(error));

    expect(endState.error).toBe(error);
    expect(endState.status).toBe(REQUEST_STATUS.IDLE);
});