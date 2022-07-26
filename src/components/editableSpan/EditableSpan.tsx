import React, {ChangeEvent, useCallback, useState} from 'react';
import {EditableSpanType} from './types';


export const EditableSpan: React.FC<EditableSpanType> = React.memo(({
                                                                        title,
                                                                        callback,
                                                                        disabled
                                                                    }) => {

    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState<string>(title);

    const onChangeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value);
    }, [])

    const onDoubleClickHandler = useCallback(() => {
        if (!disabled) {
            setEditMode(!editMode);
        }
    }, [disabled, editMode]);

    const onBlurHandler = useCallback(() => {
        setEditMode(!editMode);
        callback(inputValue);
    }, [callback, editMode, inputValue])

    return editMode
        ? <input onChange={onChangeInputHandler} value={inputValue} autoFocus
                 onDoubleClick={onDoubleClickHandler}
                 onBlur={onBlurHandler}/>
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
});

