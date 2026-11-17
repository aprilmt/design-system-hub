import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Tabs } from './Tabs'

const items = [
  {
    value: 'overview',
    label: 'Overview',
    content: <p className="text-sm text-content-secondary">Overview panel</p>,
  },
  {
    value: 'pricing',
    label: 'Pricing',
    content: <p className="text-sm text-content-secondary">Pricing panel</p>,
  },
  {
    value: 'reviews',
    label: 'Reviews',
    content: <p className="text-sm text-content-secondary">Reviews panel</p>,
  },
]

const meta = {
  component: Tabs,
  tags: ['ai-generated'],
  args: {
    items,
    defaultValue: 'overview',
    'aria-label': 'Product sections',
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Underline: Story = {
  play: async ({ canvas, userEvent }) => {
    const pricing = canvas.getByRole('tab', { name: /pricing/i })
    await expect(pricing).toHaveAttribute('aria-selected', 'false')
    await userEvent.click(pricing)
    await expect(pricing).toHaveAttribute('aria-selected', 'true')
    // Panel enter animation starts at opacity 0 — assert content, not visibility.
    await expect(
      await canvas.findByRole('tabpanel', { name: /pricing/i }),
    ).toHaveTextContent(/pricing panel/i)
  },
}

export const Pills: Story = {
  args: {
    variant: 'pills',
    'aria-label': 'Pill tabs',
  },
}
