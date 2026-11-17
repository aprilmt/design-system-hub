import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['ai-generated'],
  args: {
    label: 'Email',
    placeholder: 'jane@example.com',
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, args }) => {
    const input = canvas.getByLabelText(String(args.label))
    await expect(input).toHaveAttribute('placeholder', String(args.placeholder))
  },
}

export const WithHint: Story = {
  args: {
    hint: "We'll never share your email.",
  },
}

export const WithError: Story = {
  args: {
    label: 'Username',
    error: 'Username is already taken.',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/username/i)
    await expect(input).toHaveAttribute('aria-invalid', 'true')
  },
}

export const Disabled: Story = {
  args: {
    label: 'Company',
    value: 'Read-only Corp',
    disabled: true,
  },
}
