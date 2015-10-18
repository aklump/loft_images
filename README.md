# Loft Images

1. `<img/>` will use javascript for retina and svg handling; they take either of these attributes: `data-no-retina-src` or `data-no-svg-src`.  These attributes may be configured in `LoftImages.js`.
1. `<div/>` will use the SASS mixins for svg and retina support.  Better performance when you can embed the svg assets into your stylesheet.