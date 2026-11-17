import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Button } from './Button'
import { Dialog, DialogContent } from './Dialog'
import { Input } from './Input'

// Untyped JSX components — widen for story composition.
const Btn = Button as any
const Field = Input as any

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Btn onClick={() => setOpen(true)}>Open Dialog</Btn>
      <DialogContent
        title="Confirm Action"
        description="This dialog traps focus and can be closed with Esc."
      >
        <div className="space-y-4">
          <Field label="Confirmation" placeholder="Type confirm" />
          <div className="flex justify-end gap-3">
            <Btn variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Btn>
            <Btn onClick={() => setOpen(false)}>Confirm</Btn>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const meta = {
  component: DialogDemo,
  tags: ['ai-generated'],
} as Meta

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}

export const OpensOnClick: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open dialog/i }))
    const body = within(canvasElement.ownerDocument.body)
    const dialog = await body.findByRole('dialog')
    await expect(dialog).toHaveAccessibleName(/confirm action/i)
  },
}
