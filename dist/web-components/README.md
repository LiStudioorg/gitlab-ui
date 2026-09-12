# Native Web Components (`<gl-*>`)

Fourteen custom elements built on the platform APIs (custom elements + shadow
DOM + CSS custom properties). No framework, no bundler, no dependencies.

## Elements

| File | Element | Props (attributes) | Events |
|---|---|---|---|
| gl-button.js | `<gl-button>` | category, variant, size, disabled, loading, block, icon | click |
| gl-input.js | `<gl-input>` | type, placeholder, state, disabled, readonly, width, value | input, change |
| gl-modal.js | `<gl-modal>` | visible, title, size, action-primary, action-secondary | open, close, primary, secondary |
| gl-table.js | `<gl-table>` | items, fields (JSON), loading, sort-by, sort-desc | sortchange |
| gl-tabs.js | `<gl-tabs>` | tabs (JSON), active | change |
| gl-badge.js | `<gl-badge>` | variant, icon, href, disabled | — |
| gl-toast.js | `<gl-toast>` | message, action-text, auto-hide-delay | action, dismiss |
| gl-dropdown.js | `<gl-dropdown>` | text, items (JSON), show-clear-all | select, clear-all |
| gl-form.js | `<gl-form>` / `<gl-form-group>` | label, label-description, helper, error, optional, state | submit |
| gl-alert.js | `<gl-alert>` | variant, title, dismissible, sticky | dismiss |

## Using in any project

Host a copy of `variables.css` (theme tokens) and load the tag module or the
registration entrypoint:

```html
<link rel="stylesheet" href="css/variables.css">
<script type="module">
  import './web-components/index.js';   // registers all <gl-*> elements
</script>

<gl-button variant="confirm" category="primary" @click="...">Save</gl-button>
<gl-input placeholder="Project name" width="lg" state="invalid"></gl-input>
<gl-badge variant="success">Passed</gl-badge>
```

Styles use `var(--gl-*)` design tokens exclusively inside each `:host`
shadow root, so components adopt the active theme automatically.
