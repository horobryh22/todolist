import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthStateType} from 'store/reducers';


const initialState: AuthStateType = {
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
    }
})

export default slice.reducer;

export const {setIsLoggedIn} = slice.actions;