import {Nullable} from 'types';
import {appReducer} from 'store';
import {REQUEST_STATUS} from 'enums';
import {setAppError, setAppStatus} from 'store/reducers';

let startState: {
    error: Nullable<string>,
    status: REQUEST_STATUS,
    isInitialized: boolean
}

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
    const endState = appReducer(startState, setAppStatus(REQUEST_STATUS.LOADING));

    expect(endState.status).toBe(REQUEST_STATUS.LOADING);
    expect(endState.error).toBeNull();
});

test('the error should be set inside app state', () => {
    const endState = appReducer(startState, setAppError(error));

    expect(endState.error).toBe(error);
    expect(endState.status).toBe(REQUEST_STATUS.IDLE);
});
