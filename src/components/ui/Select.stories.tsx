import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Select } from './Select'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]

const meta = {
  component: Select,
  tags: ['ai-generated'],
  args: {
    label: 'Framework',
    options,
    placeholder: 'Pick a framework',
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, args }) => {
    const trigger = canvas.getByRole('combobox', { name: String(args.label) })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  },
}

export const WithValue: Story = {
  args: {
    value: 'react',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
