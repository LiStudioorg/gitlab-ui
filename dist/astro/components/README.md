# Astro + Tailwind components (Pajamas-inspired)

Ten core components derived from the shared `scripts/component-spec.js`
data model. All colours, radii, spacing and font values resolve through
`var(--gl-*)` design tokens defined in `dist/css/variables.css` — no
hardcoded colours anywhere.

## Components

| Export | Source | Props |
|---|---|---|
| `undefined` | `Button` | category=primary | variant=default | size=medium | disabled=false | loading=false | icon | block=false |
| `undefined` | `Input` | type=text | placeholder | state | disabled=false | readonly=false | width |
| `undefined` | `Modal` | visible=false | title | size=md | primaryAction | secondaryAction | onClose |
| `undefined` | `Table` | items=[] | fields=[] | loading=false | sortBy | sortDesc=false |
| `undefined` | `Tabs` | tabs=[] | active=0 | onChange |
| `undefined` | `Badge` | variant=neutral | icon | href |
| `undefined` | `Toast` | message | action | autoHideDelay=5000 | onDismiss |
| `undefined` | `Dropdown` | text | items=[] | showClearAll=false | onSelect |
| `undefined` | `Form / FormGroup` | label | helper | error | optional=false |
| `undefined` | `Alert` | variant=info | title | dismissible=true | sticky=false |

## Usage

```astro
---
import { Button, Alert, Table } from '../components/Button.astro'; // one import per component
---
<Button variant="confirm">Save</Button>
<Alert variant="danger" title="Build failed">job 3 timed out.</Alert>
```

## Astro notes

- Components are mostly pure presentational: props are read in the
  frontmatter and rendered at build time with Tailwind arbitrary values
  (`bg-[var(--gl-...)]`, `rounded-[var(--gl-...)]`).
- Interactive pieces (`Modal`, `Toast`, `Dropdown`, `Tabs`, `Table`) ship a
  tiny inline vanilla `<script is:inline>` (shown/closed via data attributes);
  upgrade to a `client:load` island if you need finer control.
- There is no `index` barrel file in this folder; import the `.astro` file
  you need directly.

## Props reference

- **undefined** — `category`, `variant`, `size`, `disabled`, `loading`, `icon`, `block`
- **undefined** — `type`, `placeholder`, `state`, `disabled`, `readonly`, `width`
- **undefined** — `visible`, `title`, `size`, `primaryAction`, `secondaryAction`, `onClose`
- **undefined** — `items`, `fields`, `loading`, `sortBy`, `sortDesc`
- **undefined** — `tabs`, `active`, `onChange`
- **undefined** — `variant`, `icon`, `href`
- **undefined** — `message`, `action`, `autoHideDelay`, `onDismiss`
- **undefined** — `text`, `items`, `showClearAll`, `onSelect`
- **undefined** — `label`, `helper`, `error`, `optional`
- **undefined** — `variant`, `title`, `dismissible`, `sticky`

## Tokens

Components read design tokens directly from `variables.css` (`--gl-*`);
size/colour overrides live in the `.g-*` classes and inline style custom
properties per component. See `dist/css/variables.css` for the full map.

## Regenerate

`node scripts/gen-svelte-family.js` (idempotent, safe to re-run).
