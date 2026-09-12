# Alpine.js + Tailwind CDN components

Full `.html` pages driven by Alpine.js (`x-data` / `x-show` / `x-for`,
`x-model`, `x-transition`) and Tailwind (Play CDN) with arbitrary values
that reference the `--gl-*` design tokens. Each page links
`../../css/variables.css` for the token values.

## Files

| File | Interaction |
|---|---|
| button.html | loading/saved reactive state, disabled, sizes, link |
| input.html | x-model live validation (valid/invalid), width steps |
| modal.html | open/close, sizes sm/md/lg, backdrop & Esc close, x-teleport |
| table.html | client-side sorting, busy loading state, row hover |
| tabs.html | active tab + indicator bar, count badges, disabled tab |
| badge.html | static variants (icons, link, disabled) |
| toast.html | push/remove stack, auto-hide delay, action button |
| dropdown.html | checkable items, clear all, outside-click / Esc close |
| form.html | reactive fields, validation feedback, submit handler |
| alert.html | dismissible alerts by variant, sticky alert |

## Using in your own project

Alpine and Tailwind are loaded from CDN so there is no build step:

```html
<link rel="stylesheet" href="components/../css/variables.css">
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/alpinejs" defer></script>
```

Open any `.html` file directly in a browser, or copy the `<main>` block of
the component you need into your own Alpine page. Colors, radii, spacing and
type sizes all read from the tokens, so swapping themes is done in
`variables.css` only.
