import React, {KeyboardEvent, useCallback, useRef, useState} from 'react';
import '../../../App.css';
import {Button, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export type FullInputType = {
    callback: (taskName: string) => void
    buttonName: string
}

export const FullInput: React.FC<FullInputType> = React.memo(({callback, buttonName}) => {

    console.log('FullInput called')

    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<null | string>(null);

    const onClickButtonHandler = useCallback((): void => {
        if (inputRef.current) {
            const trimmedTitle = inputRef.current.value.trim();
            if (trimmedTitle) {
                callback(trimmedTitle);
                if (error !== null) setError(null);
            } else {
                setError('Incorrect entry');
            }
            inputRef.current.value = '';
        }
    }, [callback, error]);

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>): void => {
        e.key === 'Enter' && onClickButtonHandler();
    }, [onClickButtonHandler]);

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

