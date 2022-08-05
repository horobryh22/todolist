import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FullInput } from 'components';

export default {
    title: 'Todolist/Components/FillInput',
    component: FullInput,
    argTypes: {
        callback: {
            description: 'button was clicked inside form',
        },
    },
} as ComponentMeta<typeof FullInput>;

const Template: ComponentStory<typeof FullInput> = args => <FullInput {...args} />;

export const FillInputBaseExample = Template.bind({});

FillInputBaseExample.args = {
    callback: action('button was clicked inside form'),
};
