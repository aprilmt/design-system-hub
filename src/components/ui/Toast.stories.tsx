import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Button } from './Button'
import { useToast } from './Toast'

// Untyped JSX forwardRef — widen for story composition.
const TriggerButton = Button as any

function ToastTrigger() {
  const { toast } = useToast()
  return (
    <TriggerButton
      onClick={() =>
        toast({
          variant: 'success',
          title: 'Saved',
          description: 'Your changes have been saved.',
          duration: 5000,
        })
      }
    >
      Show success toast
    </TriggerButton>
  )
}

const meta = {
  component: ToastTrigger,
  tags: ['ai-generated'],
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: /show success toast/i }),
    )
    const body = within(canvasElement.ownerDocument.body)
    const status = await body.findByText(/your changes have been saved/i)
    await expect(status).toBeVisible()
  },
}
