import React, {useState} from 'react';
import {ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Input} from './Input';
import './../../../App.css'

const getCategory = (category: string) => {
    return {
        table: {
            category
        }
    }
}

export default {
    title: 'components/Input',
    component: Input,
    argTypes: {
        setError: {
            ...getCategory('Events')
        },
        error: {
            ...getCategory('Other parameters')
        },
        inputValue: {
            ...getCategory('Other parameters')
        },
        setInputValue: {
            ...getCategory('Events')
        }
    }
}

const callback = action('button was clicked');

export const InputWork: ComponentStory<typeof Input> = (args) => {

    const [inputValue, setInputValue] = useState<string>('Some text');
    return (
        <>
            <Input {...args} inputValue={inputValue} setInputValue={setInputValue}/>
            {args.error && <div className={'error-message'}>{args.error}</div>}
        </>
    )
}
export const InputError: ComponentStory<typeof Input> = (args) => {

    const [error, setError] = useState<string | null>(args.error);
    const [inputValue, setInputValue] = useState<string>('');
    return (
        <>
            <Input {...args} inputValue={inputValue} setInputValue={setInputValue} error={error} setError={setError}/>
            {error && <div className={'error-message'}>{args.error}</div>}
        </>
    )
}

InputWork.args = {
    setError: callback,
    error: null,
}

InputError.args = {
    setError: callback,
    error: 'Text is wrong',
}








