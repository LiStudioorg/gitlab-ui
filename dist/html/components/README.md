# Native HTML + CSS components (no build step)

One self-contained `.html` file per component. Drop it in a browser - it
already links `variables.css` and `base.css` (relative paths).

## Files

| File | Element | Props covered | States covered |
|---|---|---|---|
| button.html | .gl-button | category/variant/size/disabled/loading/icon/block | default, hover, active, focus, disabled, loading |
| input.html | .gl-input | type/placeholder/state/disabled/readonly/width | default, hover, focus, valid, invalid, disabled, readonly |
| modal.html | .gl-modal | visible/title/size/primaryAction/secondaryAction | closed, opened |
| table.html | .gl-table | items/fields/loading/sortBy/sortDesc | default, loading, sorted, row-hover, empty |
| tabs.html | .gl-tabs | tabs/active | default, active, hover, disabled |
| badge.html | .gl-badge | variant/icon/href | default, hover, disabled |
| toast.html | .gl-toast | message/action/autoHideDelay | visible, leaving |
| dropdown.html | .gl-dropdown | text/items/showClearAll | closed, opened, item-checked, item-hover |
| form.html | .gl-form / .gl-form-group | label/helper/error/optional | default, valid, invalid |
| alert.html | .gl-alert | variant/title/dismissible/sticky | default, dismissing |

`base.css` provides shared layout, typography and the focus ring using the
`--gl-*` design tokens; every component style block references tokens too, so
colors, radii, spacing and type sizes are fully theme-driven.

## Using in your own project

Copy the whole `components/` directory next to your page, then:

```html
<link rel="stylesheet" href="components/base.css">
<link rel="stylesheet" href="components/button.html"><!-- n/a -->
```

No - these are complete demo pages. To reuse a single component, copy its
`<style>` block and the matching markup into your own page and keep the
two links shown above. To switch themes, host your own copy of
`../../css/variables.css` (dark/light variants are selected there).
