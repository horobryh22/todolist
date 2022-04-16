import React, {ChangeEvent} from 'react';

export type InputType = {
    inputValue: string
    setInputValue: (inputValue: string) => void
}

export const Input: React.FC<InputType> = ({inputValue, setInputValue}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    return (
        <input value={inputValue} onChange={onChangeHandler}/>
    );
};

