import React from 'react';
import '../App.css';

type ButtonPropsType = {
    name: string
    callback: () => void
    classNameButton?: string
}

export const Button: React.FC<ButtonPropsType> = ({name, callback, classNameButton}) => {

    const onClickHandler = () => {
        callback();
    }

    return (
        <button className={classNameButton} onClick={onClickHandler}>{name}</button>
    );
};
