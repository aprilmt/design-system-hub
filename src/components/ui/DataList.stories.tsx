import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { DataList } from './DataList'

const meta = {
  component: DataList,
  tags: ['ai-generated'],
  args: {
    items: [
      { label: 'Name', value: 'Jane Doe' },
      { label: 'Role', value: 'Product Designer' },
      { label: 'Team', value: 'Design Systems' },
      { label: 'Status', value: 'Active' },
    ],
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Jane Doe')).toBeVisible()
    await expect(canvas.getByText(/product designer/i)).toBeVisible()
  },
}
