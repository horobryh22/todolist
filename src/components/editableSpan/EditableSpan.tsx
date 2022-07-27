import React, { ChangeEvent, useCallback, useState } from 'react';

import { EditableSpanType } from './types';

export const EditableSpan = React.memo(
    ({ title, callback, disabled }: EditableSpanType) => {
        const [editMode, setEditMode] = useState(false);
        const [inputValue, setInputValue] = useState<string>(title);

        const onChangeInputHandler = useCallback(
            (e: ChangeEvent<HTMLInputElement>): void => {
                setInputValue(e.currentTarget.value);
            },
            [],
        );

        const onDoubleClickHandler = useCallback(() => {
            if (!disabled) {
                setEditMode(!editMode);
            }
        }, [disabled, editMode]);

        const onBlurHandler = useCallback(() => {
            setEditMode(!editMode);
            callback(inputValue);
        }, [callback, editMode, inputValue]);

        return editMode ? (
            <input
                onChange={onChangeInputHandler}
                value={inputValue}
                autoFocus
                onDoubleClick={onDoubleClickHandler}
                onBlur={onBlurHandler}
            />
        ) : (
            <span onDoubleClick={onDoubleClickHandler}>{title}</span>
        );
    },
);
