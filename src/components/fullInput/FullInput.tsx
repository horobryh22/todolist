import React, { KeyboardEvent, useCallback, useRef, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button, TextField } from '@mui/material';

import { FullInputType } from './types';

export const FullInput = React.memo(({ callback, disabled }: FullInputType) => {
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

    const onKeyPressHandler = useCallback(
        (e: KeyboardEvent<HTMLInputElement>): void => {
            if (e.key === 'Enter') onClickButtonHandler();
        },
        [onClickButtonHandler],
    );

    return (
        <div>
            <TextField
                inputRef={inputRef}
                variant="standard"
                error={Boolean(error)}
                onKeyPress={onKeyPressHandler}
                helperText={error}
                size="small"
                disabled={disabled}
            />
            <Button
                variant="contained"
                style={{
                    maxWidth: '25px',
                    maxHeight: '25px',
                    minWidth: '25px',
                    minHeight: '25px',
                }}
                onClick={onClickButtonHandler}
                disabled={disabled}
                startIcon={<AddIcon style={{ paddingLeft: '10px' }} />}
            />
        </div>
    );
});
