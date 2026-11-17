import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
  args: {
    children: 'Save changes',
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary' },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: String(args.children) })
    await expect(button).not.toBeDisabled()
  },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
}

export const Loading: Story = {
  args: { loading: true, children: 'Saving' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /saving/i })
    await expect(button).toHaveAttribute('aria-busy', 'true')
  },
}

/** Proves Tailwind / design tokens loaded via shared preview (bg-brand-primary → #6366f1). */
export const CssCheck: Story = {
  args: { children: 'Submit', variant: 'primary' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(99, 102, 241)')
  },
}
