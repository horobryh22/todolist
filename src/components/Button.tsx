import React from 'react';
import {FilterValuesType} from '../TodoList';

type ButtonPropsType = {
    name: string
    callback: () => void
}

export const Button: React.FC<ButtonPropsType> = ({name, callback}) => {

    console.log(callback);

    const onClickHandler = () => {
        callback();
    }

    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};
