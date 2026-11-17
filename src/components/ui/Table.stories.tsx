import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Table } from './Table'

const meta = {
  component: Table,
  tags: ['ai-generated'],
  args: {
    caption: 'Team roster',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { id: 1, name: 'Ada Lovelace', role: 'Designer', status: 'Active' },
      { id: 2, name: 'Grace Hopper', role: 'Engineer', status: 'Active' },
      { id: 3, name: 'Alan Turing', role: 'Research', status: 'Away' },
    ],
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const table = canvas.getByRole('table', { name: /team roster/i })
    await expect(table).toBeVisible()
    await expect(canvas.getByText('Ada Lovelace')).toBeVisible()
  },
}
