import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '../Button/Button';

export type FullInputType = {
    callback: (taskName: string) => void
    buttonName: string
}

export const FullInput: React.FC<FullInputType> = ({callback, buttonName}) => {

    const [inputValue, setInputValue] = useState<string>('');

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        e.key === 'Enter' && onClickButtonHandler();
    }

    const onClickButtonHandler = (): void => {
        const trimmedTitle = inputValue.trim();
        if (trimmedTitle) callback(inputValue);
        setInputValue('');
    };

    return (
        <div>
            <input onChange={onChangeInputHandler} value={inputValue} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickButtonHandler}>{buttonName}</button>
        </div>
    );
};
