import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../redux/store';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

export const useTypedDispatch = () => useDispatch<ThunkDispatch<AppRootState, unknown, AnyAction>>(); // necessary to change!!!!!!
export const useTypedSelector: TypedUseSelectorHook<AppRootState> = useSelector;