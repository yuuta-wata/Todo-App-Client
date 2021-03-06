import React from 'react'
import { Story } from '@storybook/react/types-6-0'

import { Props } from './type'

import Component from '.'

export default {
  component: Component
}

const Template: Story<Props> = args => <Component {...args} />

export const Default = Template.bind({})
Default.args = {
  message: 'やることを追加しよう！'
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  message: 'やることを追加しよう！',
  isLoading: true
}
