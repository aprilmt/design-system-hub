import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { EmptyState } from './EmptyState'

const meta = {
  component: EmptyState,
  tags: ['ai-generated'],
  args: {
    title: 'No files yet',
    description: 'Upload a document to get started.',
    actionLabel: 'Add file',
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, args }) => {
    // Rise-in animation keeps opacity at 0 briefly — assert content/ARIA instead of visibility.
    const status = canvas.getByRole('status')
    await expect(status).toHaveTextContent(/no files yet/i)
    await expect(
      canvas.getByRole('button', { name: String(args.actionLabel) }),
    ).toBeEnabled()
  },
}

export const WithoutAction: Story = {
  args: {
    actionLabel: undefined,
    title: 'Nothing here',
    description: 'Try another filter.',
  },
}
