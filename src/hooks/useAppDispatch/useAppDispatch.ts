import {useDispatch} from 'react-redux';
import {AppDispatch} from 'bll/redux/store';


export const useAppDispatch: () => AppDispatch = useDispatch;
