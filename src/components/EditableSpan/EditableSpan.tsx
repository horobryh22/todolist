import React, {ChangeEvent, useCallback, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, callback}) => {

    console.log('Editable Span')

    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState<string>(title);

    const onChangeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value);
    }, [])

    const onDoubleClickHandler = useCallback(() => {
        setEditMode(!editMode);
        callback(inputValue);
    }, [callback, editMode, inputValue])

    return editMode
        ? <input onChange={onChangeInputHandler} value={inputValue} autoFocus onBlur={onDoubleClickHandler}/>
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
});

