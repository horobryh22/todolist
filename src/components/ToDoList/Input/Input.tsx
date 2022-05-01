import React, {ChangeEvent} from 'react';
import '../../../App.css';

export type InputType = {
    /**
     * set this value for input
     */
    inputValue: string
    /**
     * this callback change input value, when the onChange event is triggered
     * @param inputValue - inputValue
     */
    setInputValue: (inputValue: string) => void
    /**
     * if error exist, input get errorClass
     */
    error: string | null
    /**
     * this callback change error in state
     * @param error - error can be string or null
     */
    setError: (error: string | null) => void
}

export const Input: React.FC<InputType> = ({inputValue, setInputValue, error, setError}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
        if (error) setError(null);
    }

    return (
        <>
            <input className={error ? 'error' : ''} value={inputValue} onChange={onChangeHandler}/>
        </>
    );
};

