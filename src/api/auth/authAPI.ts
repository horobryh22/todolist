import {AuthResponseType, LoginParamsType, ResponseType} from 'api/types';
import {instance} from 'api/config';

export const authAPI = {
    login: (data: LoginParamsType) => {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, data);
    },
    logout: () => {
        return instance.delete<ResponseType>(`auth/login`);
    },
    me: () => {
        return instance.get<ResponseType<AuthResponseType>>('auth/me');
    }
}