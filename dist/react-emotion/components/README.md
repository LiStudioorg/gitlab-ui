# react-emotion components

Pajamas-inspired React components generated from the shared component spec.
Styles are colocated via `@emotion/styled` template literals and the `css` prop; all values use `var(--gl-*)` tokens.

All colors, spacing, radii, shadows and z-indexes reference the shared design tokens via `var(--gl-*)` (see `dist/css/variables.css`).

## Components

| Component | States | Props |
| --- | --- | --- |
| Button | default, hover, active, focus, disabled, loading | category, variant, size, disabled, loading, icon, block |
| Input | default, hover, focus, valid, invalid, disabled, readonly | type, placeholder, state, disabled, readonly, width |
| Modal | closed, opened, entering, leaving | visible, title, size, primaryAction, secondaryAction, onClose |
| Table | default, loading, sorted, row-hover, empty | items, fields, loading, sortBy, sortDesc |
| Tabs | default, active, hover, disabled | tabs, active, onChange |
| Badge | default, hover, active, disabled | variant, icon, href |
| Toast | visible, entering, leaving | message, action, autoHideDelay, onDismiss |
| Dropdown | closed, opened, item-hover, item-checked | text, items, showClearAll, onSelect |
| Form / FormGroup | default, valid, invalid, disabled | label, helper, error, optional |
| Alert | default, dismissing | variant, title, dismissible, sticky |

## Usage

```tsx
import { Button } from './components';

<Button category="primary" variant="confirm">Save changes</Button>
```

Regenerate with `node scripts/gen-react.js` (idempotent).

