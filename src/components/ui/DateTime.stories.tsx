import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { DateTime } from './DateTime'

const meta = {
  component: DateTime,
  tags: ['ai-generated'],
  args: {
    type: 'date',
    label: 'Date',
    defaultValue: '2026-11-08',
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Date: Story = {
  play: async ({ canvas, args }) => {
    const trigger = canvas.getByRole('button', { name: String(args.label) })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toHaveTextContent(/nov 8, 2026/i)
  },
}

export const Time: Story = {
  args: {
    type: 'time',
    label: 'Time',
    defaultValue: '14:30',
  },
}

export const WithError: Story = {
  args: {
    label: 'Deadline',
    error: 'Choose a valid date to continue.',
    defaultValue: '',
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /deadline/i })
    await expect(trigger).toHaveAttribute('aria-invalid', 'true')
  },
}
