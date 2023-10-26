import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './login-form'

const meta = {
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}
