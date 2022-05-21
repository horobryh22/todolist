import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, callback}) => {

    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState<string>(title);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value);
    }

    const onDoubleClickHandler = () => {
        setEditMode(!editMode);
        callback(inputValue);
    }

    return editMode
        ? <input onChange={onChangeInputHandler} value={inputValue} autoFocus onBlur={onDoubleClickHandler}/>
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
});

