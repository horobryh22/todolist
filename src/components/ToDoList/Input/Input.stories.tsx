import React from 'react';
import {ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import './../../../App.css'
import {Input} from './Input';

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
}

const callback = action('button was clicked');

const Template: ComponentStory<typeof Input> = (props) => <Input {...props}/>;

export const InputWork = Template.bind({});

InputWork.args = {

}









