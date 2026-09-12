# Lit elements (`<gl-*>`, TypeScript)

Ten Lit 3 components, one file each, rendered from `var(--gl-*)` design
tokens. Same native custom elements and API surface as the vanilla
`dist/web-components` build.

## Element map

```
button.ts  <gl-button>       category | variant | size | disabled | loading | block | icon
input.ts   <gl-input>        type | placeholder | state | disabled | readonly | width | value
modal.ts   <gl-modal>        visible | title | size | action-primary | action-secondary
table.ts   <gl-table>        items (JSON) | fields (JSON) | loading | sort-by | sort-desc
tabs.ts    <gl-tabs>         tabs (JSON) | active
badge.ts   <gl-badge>        variant | icon | href | disabled
toast.ts   <gl-toast>        message | action-text | auto-hide-delay
dropdown.ts <gl-dropdown>    text | items (JSON) | show-clear-all
form.ts    <gl-form>         native <form> wrapper, emits 'submit'
           <gl-form-group>   label | label-description | helper | error | optional | state
alert.ts   <gl-alert>        variant | title | dismissible | sticky
```

## Project setup

```bash
npm i lit typescript
npx tsc --noEmit   # type-check only; this folder is meant as drop-in source
```

Recommended `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["components/*.ts"]
}
```

## Usage

```html
<link rel="stylesheet" href="css/variables.css">
<script type="module" src="components/index.js"></script>

<gl-button variant="confirm" category="primary">Save</gl-button>
<gl-input placeholder="Project name" width="lg" state="invalid"></gl-input>
<gl-alert variant="success" title="Merged">See the diff below.</gl-alert>
```
