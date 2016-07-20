/**
 * Loft Images JavaScript Module v1.3.17
 * http://www.intheloftstudios.com/packages/js/loft_images
 *
 * Front end Retina and SVG Handling for img tags or background images.
 *
 * Copyright 2015-2016, Aaron Klump <sourcecode@intheloftstudios.com>
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Wed Jul 20 13:01:19 PDT 2016
 */
/**
 * @code
 *   var images = new LoftImages();
 *
 *   // Here is the code as mentioned above
 *   var images = new LoftImages({autoProcessDom:true});
 *
 *   // To delay the dom processing on instantiation...
 *   $.extend(LoftImages.prototype.options, {
 *     autoProcessDom: false,
 *   });
 *   ...
 *   var images = new LoftImages();
 *   ...
 *   images.processDom()
 *
 *   // To alter the retina suffix...
 *   var images2 = new LoftImages({
 *     retinaSuffix: "-2x"
 *   });
 * @endcode
 *
 * It is also possible to use this class to find things out such as if retina
 * or svg support.
 *
 * @code
 *   var images        = new LoftImages();
 *   var isRetina      = images.retina;
 *   var hasSvgSupport = images.svg;
 * @endcode
 *
 * 
 * A NOTE ON SVG DETECTION AND MODERNIZR
 *
 * http://modernizr.com/download/?-svgasimg
 *
 * If you install Modernizr.svgasimg it will be used, otherwise we will use
 * a fallback js snippet to determine if svg is supported.
 *
 * If you have already installed modernizr, you might as well add svgasimg to
 * the test suite, but if the only reason you need it is the svg, then use the
 * fallback instead.
 *
 * CUSTOM EVENTS
 *
 * loftImagesDomReady is fired when all images have been processed.  Make sure
 * you bind your event before you call this.processDom()!
 *
 * @code
 *   $(document).bind('loftImagesDomReady', function () {
 *     console.log('DOM is ready.');
 *   });
 *   var images = new LoftImages();
 *   images.processDom();
 * @endcode
 */
var LoftImages = (function ($, document) {

  function Images (settings) {
    this.version = "1.3.17";

    // These are the options with default values.
    if (typeof settings === 'string') {
      settings = {classBase: settings};
    }
    this.settings = {};
    $.extend(this.settings, this.options, settings);
    
    if (this.settings.autoInit) {
      this.init();
    }
    if (this.settings.autoProcessDom) {
      this.processDom();
    }
  }

  /**
   * Defines all the default options.
   */
  Images.prototype.options = {
    // Add this to an img element to indicate this should be an svg
    // image when supported.  The value of this tag is the non svg 
    // fallback file.  The svg file must use the same filename with
    // the extension of .svg.
    // E.g. <img data-no-svg-src="image.png"/>
    dataSvgAttribute    : 'no-svg-src',

    // Add this to an img element to indicate this should be a retina
    // image when supported.  The value of this tag is the non retina 
    // file.  The retina file must use the same filename with
    // the addition of the retinaSuffix, as seen below.
    // E.g. <img data-image-src="image.jpg"/>
    // 
    // @see _variables.scss This should match $loft_images_retina_suffix
    dataRetinaAttribute : 'no-retina-src',
    
    // Used to concantenate the non-retina filename with it's extension
    // For a file image.png it would work like this 
    // 'image' + retinaSuffix + '.png', e.g. image@2x.png
    retinaSuffix        : '@2x',

    // Defines the media query to use that defines when we have a retina
    // device.
    // @see _variables.scss This should match $loft_images_retina_media_query
    retinaMediaQuery    : '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)',

    // When the DOM is processed this will be used as the jQuery context.
    // You may pass an HTML object or a string selector, anything valid to
    // the jQuery contstructor.
    context             : document,

    // Used by jQuery to select an element onto which to place the environment
    // classes stored in retinaClassOnRoot, noRetinaClassOnRoot, etc...
    classRootSelector   : 'html',

    // Set to true and the constructor will call .init().
    autoInit            : true,

    // Set to true and the constructor will call .processDom().
    autoProcessDom      : true,

    // CSS classnames
    onceClass           : 'loft-images',
    retinaClassOnRoot   : 'retina',
    noRetinaClassOnRoot : 'no-retina',
    svgClassOnRoot      : 'svgasimg',
    noSvgClassOnRoot    : 'no-svgasimg',
  };

  /**
   * Initializes values.
   *
   * You must call this function after som prototype changes as the values
   * are cached in object properties, e.g., isSvg and isRetina.
   *
   * @return {LoftImages}
   */
  Images.prototype.init = function () {
    var self    = this;
    self.svg    = self.isSvg();
    self.retina = self.isRetina();

    return this;
  };

  /**
   * Processes the DOM for images and applies necessary classes per environment.
   *
   * @return {[type]} [description]
   */
  Images.prototype.processDom = function () {
    var self = this;
    var s    = self.settings;

    // Handle root element classes.
    var rootClass = s.noRetinaClassOnRoot;
    if (self.retina) {
      rootClass = s.retinaClassOnRoot;
    }

    if (self.svg) {
      rootClass += ' ' + s.svgClassOnRoot;
    }
    else {
      rootClass += ' ' + s.noSvgClassOnRoot; 
    }
    $(s.classRootSelector)
    // .removeClass('retina no-retina svg no-svg')
    .removeClass([s.retinaClassOnRoot, s.noRetinaClassOnRoot, s.svgClassOnRoot, s.noSvgClassOnRoot].join(' '))
    .addClass(rootClass);

    // Convert our context to a jQuery object.
    var $context = self.settings.context ? $(self.settings.context) : $(document);

    self.pending = 0;

    // Calculate our sets to determine when we're done.
    var $svgSet = $context.find('*[data-' + s.dataSvgAttribute + ']:not(.' + s.onceClass + ')');
    self.pending += $svgSet.length;
    
    var $retinaSet = $context.find('*[data-' + s.dataRetinaAttribute + ']:not(.' + s.onceClass + ')');
    self.pending += $retinaSet.length;
    self.processed = 0;

    // Process all svg images.    
    $svgSet
    .addClass(s.onceClass + '-processed')
    .each(function () {
      self.processSvgImage(this);    
    });

    // Process all retina images.
    $retinaSet
    .addClass(s.onceClass + '-processed')
    .each(function() {
      self.processRetinaImage(this);
    });

    // We must call this here if there is nothing to process.
    if (self.pending < 1) {
      decrementPending(self);
    }

    return self;
  };

  /**
   * Helper function to fire the DomReady event.
   *
   * @param  {LoftImages} obj
   */
  function decrementPending(obj) {
    obj.pending--;
    obj.processed++;
    if (obj.pending < 1) {
      delete obj.pending;
      $.event.trigger('loftImagesDomReady', obj);
    }
  }

  Images.prototype.processSvgImage = function (image) {
    image = image instanceof jQuery ? image : $(image);
    var imagePath = image.data(this.settings.dataSvgAttribute);
    var parts;
    
    if (imagePath) {
      if (this.svg && (parts = imagePath.match(/(.+)(\..+$)/))) {
        imagePath = parts[1] + '.svg';
      }
      this.applySource(image, imagePath);
    }
    decrementPending(this);
    
    return this;
  };

  /**
   * Processes a single img tag for based on retina status.
   *
   * @param  {HTMLImageElement}|{jQuery} image
   *
   * @return this;
   */
  Images.prototype.processRetinaImage = function (image) {
    image = image instanceof jQuery ? image : $(image);
    var imagePath = image.data(this.settings.dataRetinaAttribute);
    var parts;

    if (imagePath) {
      if (this.retina && (parts = imagePath.match(/(.+)(\..+$)/))) {
        imagePath = parts[1] + this.settings.retinaSuffix + parts[2];
      }
      this.applySource(image, imagePath);
    }

    decrementPending(this);
    return this;
  };

  Images.prototype.applySource = function (el, imagePath) {
    el = el instanceof jQuery ? el.get(0) : el;
    var tag   = el.nodeName.toLowerCase();
    if (tag === 'img') {
      $(el).attr('src', imagePath);
    }
    else {
      $(el).css('backgroundImage', 'url(' + imagePath + ')');
    }
  };

  /**
   * Detects if the current device is a retina device.
   *
   * @return {Boolean}
   *
   * @see  this.retina which is cached during this.init().
   */
  Images.prototype.isRetina = function () {
    if (window.devicePixelRatio > 1) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(this.settings.mediaQuery).matches) {
      return true;
    }
    return false;
  };

  /**
   * Detects support for svgs in the image tag of the current device.
   *
   * @return {Boolean}
   *
   * @see  this.svg which is cached during this.init().
   */
  Images.prototype.isSvg = function () {
    if (typeof Modernizr !== 'undefined' && typeof Modernizr.svgasimg !=='undefined') {
      return Modernizr.svgasimg;
    }
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
  };

  return Images;

})(jQuery, document);
