import React, {KeyboardEvent, useRef, useState} from 'react';
import '../../../App.css';
import {Button, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export type FullInputType = {
    callback: (taskName: string) => void
    buttonName: string
}

export const FullInput: React.FC<FullInputType> = React.memo(({callback, buttonName}) => {

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
                setError('Incorrect entry');
            }
            inputRef.current.value = '';
        }
    };

    return (
        <div>
            <TextField
                inputRef={inputRef}
                variant="standard"
                error={Boolean(error)}
                onKeyPress={onKeyPressHandler}
                helperText={error}
                size="small"/>
            <Button
                variant={'contained'}
                style={{maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}}
                onClick={onClickButtonHandler}
                startIcon={<AddIcon style={{paddingLeft: '10px'}}/>}
            />
        </div>
    );
});

