# Loft Images

1. `<img/>` will use javascript for retina and svg handling; they take either of these attributes: `data-no-retina-src` or `data-no-svg-src`.  These attributes may be configured in `LoftImages.js`.
1. `<div/>` will use the SASS mixins for svg and retina support.  Better performance when you can embed the svg assets into your stylesheet.

## Aspect-ratio
1. If you don't have control at the server level of the aspect ratio of the image, you should use a div with a background image and the mixin `loft_images_aspect_ratio`.
## Bower
    bower install loft_images --save

### `.gitignore`
For a production environment you may use:

    /bower_components/loft-images/*
    !/bower_components/loft-images/dist

## Using Drupal?
* Check out the backend solution here: <https://www.drupal.org/project/auto_retina>

## SASS Integration
There are two files you may embed, which provide some nice mixins.

| filename | notes | snippet |
|----------|----------|------|
| \_loft\_images.scss | mixins are namespaced to avoid collision | @import "...dist/sass/loft_images" |
| \_loft\_images\_shortnames.scss | shorter names, easier to remember; short names may collide with other mixins. | @import "...dist/sass/loft_images_shortnames" |
