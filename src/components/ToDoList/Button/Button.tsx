import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import classes from './Button.module.css';


type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    name: string
    callback: () => void
}

export const Button: React.FC<ButtonPropsType> = ({name, callback, ...props}) => {

    const onClickHandler = () => {
        callback();
    }

    return (
        <button onClick={onClickHandler} className={classes.button} {...props}>{name}</button>
    );
};
