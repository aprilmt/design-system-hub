import {
  Bar,
  Button,
  Stage,
  Text,
  Toast,
  Window,
  type Act,
} from './kit'
import './kit/stageshow.css'
import './designhub-look.css'
import './DesignHubHero.css'

type S = {
  selected: boolean
  linked: boolean
  dialog: boolean
  toast: boolean
}

const initial: S = {
  selected: false,
  linked: false,
  dialog: false,
  toast: false,
}

const REST = { wide: { x: 520, y: 210 }, compact: { x: 250, y: 250 } }

const POSTER: S = {
  selected: true,
  linked: true,
  dialog: true,
  toast: true,
}

async function script(a: Act<S>) {
  await a.wait(700)

  // Pick brand-primary token
  await a.move('token-brand')
  await a.wait(280)
  await a.click()
  await a.set({ selected: true })
  await a.wait(450)

  // Preview button adopts the accent
  await a.set({ linked: true })
  await a.wait(500)

  // Open dialog from the linked button
  await a.move('preview-button')
  await a.wait(280)
  await a.click()
  await a.set({ dialog: true })
  await a.wait(550)

  // Toast confirms the link
  await a.set({ toast: true })
  await a.move('rest')
  await a.wait(1600)

  // Visible undo: close dialog, dismiss toast, clear selection
  await a.move('dialog-close')
  await a.wait(220)
  await a.click()
  await a.set({ dialog: false })
  await a.wait(300)
  await a.set({ toast: false })
  await a.wait(250)
  await a.set({ linked: false, selected: false })
  await a.move('rest')
  await a.wait(500)
}

export function DesignHubHero() {
  return (
    <Stage
      width={720}
      height={340}
      compact={{ below: 420, width: 358, height: 320 }}
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST, style: 'arrow', ripple: true }}
      theme="light"
      palette="accent"
      fidelity="standard"
      greys="cool"
      className="dh look-designhub"
      fill
    >
      {(s, _rect, layout) => (
        <>
          <Window url="designhub.dev/sandbox" className="dh-browser">
            <div className="dh-body">
              <aside className="dh-tokens">
                <div className="dh-tokens-label">Tokens</div>

                <div
                  className="dh-token"
                  data-target="token-brand"
                  data-cursor="pointer"
                  data-selected={s.selected || undefined}
                >
                  <span className="dh-swatch dh-swatch--brand" />
                  <span className="dh-token-name">brand-primary</span>
                </div>

                <div className="dh-token" aria-hidden>
                  <Bar w={22} h={22} r={6} tone={2} />
                  <Bar w={72} h={7} tone={2} />
                </div>
                <div className="dh-token" aria-hidden>
                  <Bar w={22} h={22} r={6} tone={1} />
                  <Bar w={58} h={7} tone={1} />
                </div>
                <div className="dh-token" aria-hidden>
                  <Bar w={22} h={22} r={6} tone={3} />
                  <Bar w={64} h={7} tone={2} />
                </div>
              </aside>

              <main className="dh-preview">
                <div className="dh-preview-head">
                  <Text className="dh-preview-title">Components</Text>
                  <span className="dh-preview-meta">Button · Dialog · Toast</span>
                </div>

                <div className="dh-canvas">
                  <span className="dh-canvas-label">Preview</span>

                  <div
                    className="dh-linked"
                    data-show={s.linked || undefined}
                  >
                    Linked to brand-primary
                  </div>

                  <Button
                    variant={s.linked ? 'primary' : 'secondary'}
                    size="large"
                    data-target="preview-button"
                    data-cursor="pointer"
                  >
                    Open dialog
                  </Button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                    <Bar w={layout === 'compact' ? 120 : 180} h={8} tone={1} />
                    <Bar w={layout === 'compact' ? 90 : 140} h={8} tone={1} />
                    <Bar w={layout === 'compact' ? 100 : 160} h={8} tone={2} />
                  </div>

                  <div className="dh-scrim" data-show={s.dialog || undefined} />

                  <div className="dh-dialog" data-show={s.dialog || undefined}>
                    <div className="dh-dialog-title">Apply token?</div>
                    <div className="dh-dialog-body">
                      Map brand-primary onto this Button and its focus ring.
                    </div>
                    <div className="dh-dialog-actions">
                      <Button
                        variant="ghost"
                        size="small"
                        data-target="dialog-close"
                        data-cursor="pointer"
                      >
                        Close
                      </Button>
                      <Button variant="primary" size="small">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="dh-toast">
                  <Toast show={s.toast}>Token linked</Toast>
                </div>
              </main>
            </div>
          </Window>

          <span
            data-target="rest"
            style={{
              position: 'absolute',
              left: REST[layout].x,
              top: REST[layout].y,
              width: 1,
              height: 1,
            }}
          />
        </>
      )}
    </Stage>
  )
}
