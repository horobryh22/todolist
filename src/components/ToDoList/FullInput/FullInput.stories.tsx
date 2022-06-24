import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FullInput} from './FullInput';
import {action} from '@storybook/addon-actions';


export default {
    title: 'Todolist/Components/FillInput',
    component: FullInput,
    argTypes: {
        callback: {
            description: 'button was clicked inside form'
        }
    },
} as ComponentMeta<typeof FullInput>;

const Template: ComponentStory<typeof FullInput> = (args) => <FullInput {...args} />;

export const FillInputBaseExample = Template.bind({});

FillInputBaseExample.args = {
    callback: action('button was clicked inside form')
};
