import React, {ChangeEvent} from 'react';
import '../../../App.css';

export type InputType = {
    inputValue: string
    setInputValue: (inputValue: string) => void
    error: string | null
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

