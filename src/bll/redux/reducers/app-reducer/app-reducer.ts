export enum REQUEST_STATUS {
    IDLE  = 'idle',
    LOADING = 'loading',
    SUCCESS = 'succeeded',
    FAILED = 'failed'
}

const initialState = {
    status: 'idle' as REQUEST_STATUS,
    error: null as null | string
}

export type AppStateType = typeof initialState;

export const appReducer = (state: AppStateType = initialState, action: ActionTypesApp): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.appStatus}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setAppStatusAC = (appStatus: REQUEST_STATUS) => {
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