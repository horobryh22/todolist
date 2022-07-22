import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from 'bll/redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
