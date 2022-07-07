export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

// enum REQUEST_STATUS {
//     IDLE  = 'idle',
//     LOADING = 'loading',
//     SUCCESS = 'succeeded',
//     FAILED = 'failed'
// }

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: ActionTypesApp): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.appStatus}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setAppStatusAC = (appStatus: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            appStatus
        }
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}

export type ActionTypesApp = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>