import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import classes from './Button.module.css';


type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    /**
     * It's name for this button
     */
    name: string
    /**
     * Callback for onClick Event
     */
    callback: () => void
    /**
     * get color for example, like a test
     */
    color?: string
}

export const Button: React.FC<ButtonPropsType> = React.memo(({name, callback, color, ...props}) => {

    const onClickHandler = () => {
        callback();
    }

    return (
        <button style={{color}} onClick={onClickHandler} className={classes.button} {...props}>{name}</button>
    );
});

