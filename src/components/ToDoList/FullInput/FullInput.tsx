import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../../../App.css';

export type FullInputType = {
    callback: (taskName: string) => void
    buttonName: string
}

export const FullInput: React.FC<FullInputType> = ({callback, buttonName}) => {

    const [error, setError] = useState<null | string>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        e.key === 'Enter' && onClickButtonHandler();
    }

    const onClickButtonHandler = (): void => {
        const trimmedTitle = inputValue.trim();
        if (trimmedTitle) {
            callback(inputValue);
            setError(null);
        } else {
            setError('Text is wrong');
        }
        setInputValue('');
    };

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                onChange={onChangeInputHandler}
                value={inputValue}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickButtonHandler}>{buttonName}</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
