import React from 'react';
import {ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button} from './Button';
import './../../../App.css'

const getCategory = (category: string) => {
    return {
        table: {
            category
        }
    }
}

export default {
    title: 'Todolist/Components/Button',
    component: Button,
    argTypes: {
        color: {
            control: 'color',
            ...getCategory('Color')
        },
        name: {
            ...getCategory('General')
        },
        className: {
            ...getCategory('General')
        },
        callback: {
            ...getCategory('Events')
        }
    }
}

const callback = action('button was clicked');

const Template: ComponentStory<typeof Button> = (props) => <Button {...props}/>;

export const ButtonActive = Template.bind({});
export const ButtonNotActive = Template.bind({});
export const ButtonRemove = Template.bind({});

ButtonActive.args = {
    name: 'All',
    callback: callback,
    className: 'active-filter',
}

ButtonNotActive.args = {
    name: 'Active',
    callback: callback,
    color: 'black',      // for Example
    className: '',
}

ButtonRemove.args = {
    name: 'x',
    callback: callback
}








