import React, {KeyboardEvent, useRef, useState} from 'react';
import '../../../App.css';

export type FullInputType = {
    callback: (taskName: string) => void
    buttonName: string
}

export const FullInput: React.FC<FullInputType> = ({callback, buttonName}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<null | string>(null);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        e.key === 'Enter' && onClickButtonHandler();
    }

    const onClickButtonHandler = (): void => {
        if (inputRef.current) {
            const trimmedTitle = inputRef.current.value.trim();
            if (trimmedTitle) {
                callback(trimmedTitle);
                setError(null);
            } else {
                setError('Text is wrong');
            }
            inputRef.current.value = '';
        }
    };

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                ref={inputRef}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickButtonHandler}>{buttonName}</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
