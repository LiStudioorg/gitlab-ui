# htmx + Tailwind components (server-driven fragments)

Each `*.html` file is a **fragment** (no full page skeleton). It uses htmx
attributes (`hx-get` / `hx-post` / `hx-delete` / `hx-trigger` /
`hx-target` / `hx-swap` / `hx-indicator`) and Tailwind classes with
`var(--gl-*)` arbitrary values for all colors, radii and spacing.

## Files

| File | htmx features demonstrated |
|---|---|
| button.html | hx-post + hx-indicator spinner + hx-disabled-elt + hx-confirm |
| input.html | hx-trigger="change, keyup changed delay:500ms" server validation |
| modal.html | native <dialog> + hx-get content injection |
| table.html | sortable header hx-get, hx-trigger="revealed" infinite rows |
| tabs.html | hx-get pane swapping with active tab styling |
| badge.html | static capsule variants + hx-get load-more |
| toast.html | auto-hide via hx-trigger="load delay:5s", hx-delete dismiss |
| dropdown.html | menu toggle via hx-on:click, checkable items, clear all |
| form.html | hx-post submit + inline validation with hx-indicator |
| alert.html | dismiss via hx-delete targeting closest, load-more |

## Mounting the fragments

Fragments are NOT standalone pages. Mount one in any host page that already
loads htmx, Tailwind (Play CDN) and the token stylesheet:

```html
<head>
  <link rel="stylesheet" href="../css/variables.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org@1.9.12"></script>
</head>
<body>
  <div id="slot"></div>
  <script>
    // stream a fragment into a slot on load
    htmx.ajax('GET', 'components/button.html', { target: '#slot', swap: 'innerHTML' });
  </script>
</body>
```

Or paste the fragment's markup directly into your page. Point the
`hx-*` URLs at your backend (the fragments assume endpoints that return
the swapped HTML fragments, e.g. a validated field or a sorted table body).
