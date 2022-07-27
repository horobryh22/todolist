import { REQUEST_STATUS } from 'enums';
import { Nullable } from 'types';

export type AppStateType = {
    status: REQUEST_STATUS;
    error: Nullable<string>;
    isInitialized: boolean;
};
