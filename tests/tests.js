/**
 * @file
 * Tests provided against the LoftImages class.
 *
 * @ingroup loft_images
 * @{
 */
var QUnit      = QUnit || {};
QUnit.storage  = {};
var LoftImages = LoftImages || {};
var images     = {};

QUnit.begin(function () {
  QUnit.storage.htmlClass = $('html').attr('class') || '';
  QUnit.storage.prototype = $.extend({}, LoftImages.prototype);
  QUnit.storage.$template = $('#template').clone();
  $('#template').replaceWith(QUnit.storage.$template.clone().attr('id', 'test'));
  QUnit.storage.inlineSvgControl = 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+aWNvbjwvdGl0bGU+PGNpcmNsZSBjeD0iMzcyIiBjeT0iMTY5IiByPSIxMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM2MCAtMTU3KSIgZmlsbD0iIzQ5OTBFMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+")';
});

QUnit.done(function () {
  $('#test').replaceWith(QUnit.storage.$template);
});

// Sets it so our tests only process on our test element.
$.extend(LoftImages.prototype.options, {context: '#test'});

//
//
// Build your tests below here...
//
QUnit.test("Assert aspect_ratio works as expected custom child.", function(assert) {
  var $el = $('.grandpa').addClass('grandpa--aspect-ratio-child').find('.father');
  var control = {w: 400};
  control.h = control.w / 16 * 9;
  control.w += 'px';
  control.h += 'px';
  assert.strictEqual($el.css('width'), control.w);
  assert.strictEqual($el.css('position'), 'relative');
  assert.strictEqual($el.css('height'), '0px');
  assert.strictEqual($el.css('paddingTop'), control.h);
  assert.strictEqual($el.css('paddingRight'), '0px');
  assert.strictEqual($el.css('paddingBottom'), '0px');
  assert.strictEqual($el.css('paddingLeft'), '0px');
  assert.strictEqual($el.css('overflow'), 'hidden');

  var $inner = $el.find('.baby3');
  assert.strictEqual($inner.css('position'), 'absolute');
  assert.strictEqual($inner.css('width'), control.w);
  assert.strictEqual($inner.css('height'), control.h);
  assert.strictEqual($inner.css('top'), '0px');
  assert.strictEqual($inner.css('right'), '0px');
  assert.strictEqual($inner.css('bottom'), '0px');
  assert.strictEqual($inner.css('left'), '0px');
  assert.strictEqual($inner.css('display'), 'block');
});

QUnit.test("Assert aspect_ratio works as expected using ratio float.", function(assert) {
  var $el = $('.grandpa').addClass('grandpa--aspect-ratio-ratio').find('.father');
  var control = {w: 400};
  control.h = control.w / 4 * 3;
  control.w += 'px';
  control.h += 'px';
  assert.strictEqual($el.css('width'), control.w);
  assert.strictEqual($el.css('position'), 'relative');
  assert.strictEqual($el.css('height'), '0px');
  assert.strictEqual($el.css('paddingTop'), control.h);
  assert.strictEqual($el.css('paddingRight'), '0px');
  assert.strictEqual($el.css('paddingBottom'), '0px');
  assert.strictEqual($el.css('paddingLeft'), '0px');
  assert.strictEqual($el.css('overflow'), 'hidden');

  var $inner = $el.find('.son');
  assert.strictEqual($inner.css('position'), 'absolute');
  assert.strictEqual($inner.css('width'), control.w);
  assert.strictEqual($inner.css('height'), control.h);
  assert.strictEqual($inner.css('top'), '0px');
  assert.strictEqual($inner.css('right'), '0px');
  assert.strictEqual($inner.css('bottom'), '0px');
  assert.strictEqual($inner.css('left'), '0px');
  assert.strictEqual($inner.css('display'), 'block');
});

QUnit.test("Assert aspect_ratio works as expected with defaults.", function(assert) {
  var $el = $('.grandpa').addClass('grandpa--aspect-ratio').find('.father');
  var control = {w: 400};
  control.h = control.w / 16 * 9;
  control.w += 'px';
  control.h += 'px';
  assert.strictEqual($el.css('width'), control.w);
  assert.strictEqual($el.css('position'), 'relative');
  assert.strictEqual($el.css('height'), '0px');
  assert.strictEqual($el.css('paddingTop'), control.h);
  assert.strictEqual($el.css('paddingRight'), '0px');
  assert.strictEqual($el.css('paddingBottom'), '0px');
  assert.strictEqual($el.css('paddingLeft'), '0px');
  assert.strictEqual($el.css('overflow'), 'hidden');

  var $inner = $el.find('.son');
  assert.strictEqual($inner.css('position'), 'absolute');
  assert.strictEqual($inner.css('width'), control.w);
  assert.strictEqual($inner.css('height'), control.h);
  assert.strictEqual($inner.css('top'), '0px');
  assert.strictEqual($inner.css('right'), '0px');
  assert.strictEqual($inner.css('bottom'), '0px');
  assert.strictEqual($inner.css('left'), '0px');
  assert.strictEqual($inner.css('display'), 'block');
});

QUnit.test("Assert SASS smart_bg() theme--toppx works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--toppx');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '50% 10px');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('margin'), '0px');
  assert.strictEqual($icon.css('paddingTop'), '44px');
  assert.strictEqual($icon.css('paddingRight'), '0px');
  assert.strictEqual($icon.css('paddingBottom'), '0px');
  assert.strictEqual($icon.css('paddingLeft'), '0px');
});

QUnit.test("Assert SASS smart_bg() theme--bottom works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--bottom');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '50% 100%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('margin'), '0px');
  assert.strictEqual($icon.css('paddingTop'), '0px');
  assert.strictEqual($icon.css('paddingRight'), '0px');
  assert.strictEqual($icon.css('paddingBottom'), '34px');
  assert.strictEqual($icon.css('paddingLeft'), '0px');
});

QUnit.test("Assert SASS smart_bg() theme--top works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--top');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '50% 0%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('margin'), '0px');
  assert.strictEqual($icon.css('paddingTop'), '34px');
  assert.strictEqual($icon.css('paddingRight'), '0px');
  assert.strictEqual($icon.css('paddingBottom'), '0px');
  assert.strictEqual($icon.css('paddingLeft'), '0px');
});


QUnit.test("Assert SASS smart_bg() theme--leftpx works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--leftpx');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '10px 50%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('margin'), '0px');
  assert.strictEqual($icon.css('paddingTop'), '0px');
  assert.strictEqual($icon.css('paddingRight'), '0px');
  assert.strictEqual($icon.css('paddingBottom'), '0px');
  assert.strictEqual($icon.css('paddingLeft'), '44px');
  
});

QUnit.test("Assert SASS smart_bg() theme--left works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--left');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '0% 50%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('margin'), '0px');
  assert.strictEqual($icon.css('paddingTop'), '0px');
  assert.strictEqual($icon.css('paddingRight'), '0px');
  assert.strictEqual($icon.css('paddingBottom'), '0px');
  assert.strictEqual($icon.css('paddingLeft'), '34px');
});

QUnit.test("Assert SASS smart_bg() theme--right works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--right');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '100% 50%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('margin'), '0px');
  assert.strictEqual($icon.css('paddingTop'), '0px');
  assert.strictEqual($icon.css('paddingRight'), '34px');
  assert.strictEqual($icon.css('paddingBottom'), '0px');
  assert.strictEqual($icon.css('paddingLeft'), '0px');
});

QUnit.test("Assert SASS smart_bg() theme--right-center works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--right-center');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '100% 50%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('margin'), '0px');
  assert.strictEqual($icon.css('paddingTop'), '0px');
  assert.strictEqual($icon.css('paddingRight'), '34px');
  assert.strictEqual($icon.css('paddingBottom'), '0px');
  assert.strictEqual($icon.css('paddingLeft'), '0px');
});

QUnit.test("Assert SASS smart_bg() theme--center works.", function(assert) {
  var $icon = $('.group-background__span');

  $icon.addClass('theme--center');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '50% 50%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('padding'), '0px');
  assert.strictEqual($icon.css('margin'), '0px');
});

QUnit.test("Assert SASS svg_bg() works.", function(assert) {
  var $icon = $('.group-background__span');
  assert.notStrictEqual($icon.height(), 24);
  assert.notStrictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '50% 50%');
  assert.strictEqual($icon.css('backgroundSize'), 'auto');
  assert.strictEqual($icon.css('display'), 'inline');
  assert.strictEqual($icon.css('padding'), '0px');
  assert.strictEqual($icon.css('margin'), '0px');
});

QUnit.test("Assert SASS svg_icon() works.", function(assert) {
  var $icon = $('.group-icon__icon');
  assert.strictEqual($icon.height(), 24);
  assert.strictEqual($icon.width(), 24);
  assert.strictEqual($icon.css('backgroundImage'), QUnit.storage.inlineSvgControl);
  assert.strictEqual($icon.css('backgroundRepeat'), 'no-repeat');
  assert.strictEqual($icon.css('backgroundPosition'), '50% 50%');
  assert.strictEqual($icon.css('backgroundSize'), 'contain');
  assert.strictEqual($icon.css('display'), 'block');
});

QUnit.test("Assert autoProcessDom is on by default.", function(assert) {
  var done = assert.async();
  $(document).bind('loftImagesDomReady', function () {
    assert.ok($('#test .retina-1').attr('src'));
    assert.ok($('#test .svg-1').attr('src'));
    assert.ok($('#test .svg-2').attr('src'));
    assert.ok($('#test .retina-2').attr('src'));
    $(document).unbind('loftImagesDomReady');  
    done();
  });
  var obj = new LoftImages();
});

QUnit.test("Assert root element receives custom classes in non svg and non retina environments.", function(assert) {
  LoftImages.prototype.isRetina = function() { return false; };
  LoftImages.prototype.isSvg    = function() { return false; };

  var done = assert.async();
  $(document).bind('loftImagesDomReady', function () {
    assert.ok($('html').hasClass('no-hi-res'), 'html received custom "no-retina" class by default in non-retina environment.');  
    assert.ok($('html').hasClass('no-line-art'), 'html received custom "no-svgasimg" class by default in non-svg environment.');
    $(document).unbind('loftImagesDomReady');
    done();
  });
  
  var obj = new LoftImages({
    retinaClassOnRoot   : 'hi-res',
    noRetinaClassOnRoot : 'no-hi-res',
    svgClassOnRoot      : 'line-art',
    noSvgClassOnRoot    : 'no-line-art',
  });
  obj.init().processDom();
});

QUnit.test("Assert root element receives custom classes in svg and retina environments.", function(assert) {
  LoftImages.prototype.isRetina = function() { return true; };
  LoftImages.prototype.isSvg    = function() { return true; };

  var done = assert.async();
  $(document).bind('loftImagesDomReady', function () {
    assert.ok($('html').hasClass('hi-res'), 'html received custom "retina" class by default in retina environment.');  
    assert.ok($('html').hasClass('line-art'), 'html received custom "svgasimg" class by default in svg environment.');
    $(document).unbind('loftImagesDomReady');
    done();
  });

  var obj = new LoftImages({
    retinaClassOnRoot   : 'hi-res',
    noRetinaClassOnRoot : 'no-hi-res',
    svgClassOnRoot      : 'line-art',
    noSvgClassOnRoot    : 'no-line-art',
  });
  obj.init().processDom();
});

QUnit.test("Assert processDom with sub context catches sub group only.", function(assert) {
  var done = assert.async();
  $(document).bind('loftImagesDomReady', function () {
    assert.ok($('#test .retina-1').attr('src'));
    assert.ok($('#test .svg-1').attr('src'));
    assert.notOk($('#test .svg-2').attr('src'));
    assert.notOk($('#test .retina-2').attr('src'));
    $(document).unbind('loftImagesDomReady');  
    done();
  });
  var obj = new LoftImages({context: '#test .group-1', autoProcessDom: false});
  obj.processDom();
});

QUnit.test("Assert processDom with default context catches all", function(assert) {
  var done = assert.async();
  $(document).bind('loftImagesDomReady', function () {
    assert.ok($('#test .retina-1').attr('src'));
    assert.ok($('#test .retina-2').attr('src'));
    assert.ok($('#test .svg-1').attr('src'));
    assert.ok($('#test .svg-2').attr('src'));
    $(document).unbind('loftImagesDomReady');  
    done();
  });
  images.processDom();
});

QUnit.test("Assert custom retina suffix works", function(assert) {
  LoftImages.prototype.isRetina = function() { return true; };
  var obj    = new LoftImages({retinaSuffix: '-2x'});
  var $image = $('#test .retina-1');
  obj.processRetinaImage($image);
  assert.strictEqual($image.attr('src'), 'images/bitmap-2x.jpg');
});

QUnit.test("Class root custom selector", function(assert) {
  var custom = '#test';
  LoftImages.prototype.isSvg = function() { return false; };
  var obj = new LoftImages({
    classRootSelector: custom,
    autoProcessDom: true,
  });
  assert.ok($(custom).hasClass('no-svgasimg'), 'html received "no-svgasimg" class by default in non-svg environment.');
});

QUnit.test("Class root selector: default, non-svg", function(assert) {
  LoftImages.prototype.isSvg = function() { return false; };
  images.init().processDom();
  assert.ok($('html').hasClass('no-svgasimg'), 'html received "no-svgasimg" class by default in non-svg environment.');
});

QUnit.test("Class root selector default, svg", function(assert) {
  LoftImages.prototype.isSvg = function() { return true; };
  images.init().processDom();
  assert.ok($('html').hasClass('svgasimg'), 'html received "svg" class by default in svg environment.');
});

QUnit.test("Class root selector: default, non-retina", function(assert) {
  LoftImages.prototype.isRetina = function() { return false; };
  images.init().processDom();
  assert.ok($('html').hasClass('no-retina'), 'html received "no-retina" class by default in non-retina environment.');
});

QUnit.test("Class root selector default, retina", function(assert) {
  LoftImages.prototype.isRetina = function() { return true; };
  images.init().processDom();
  assert.ok($('html').hasClass('retina'), 'html received "retina" class by default in retina environment.');
});

QUnit.test("Assert process methods return LoftImages", function(assert) {
  assert.ok(images.processRetinaImage($('#test .retina-1')) instanceof LoftImages, 'returns LoftImages.');
  assert.ok(images.processSvgImage($('#test .svg-1')) instanceof LoftImages, 'returns LoftImages.');
});

QUnit.test("Assert init returns LoftImages", function(assert) {
  var images = new LoftImages();
  assert.ok(images.init() instanceof LoftImages);
});

QUnit.test("Assert processSvgImage() handles non-jQuery argument.", function(assert) {
  LoftImages.prototype.isSvg = function() {
    return false;
  };
  images.init();

  var image    = document.getElementsByClassName('svg-1');
  image = image[0];
  assert.ok(image, 'Image selected using native code.');
  images.processSvgImage(image);

  assert.strictEqual(image.getAttribute('src'), "images/svg.png", 'Non-svg version applied in non-svg environment.');  
});

QUnit.test("Assert processSvgImage() works with default settings.", function(assert) {
  var $image   = $('#test .svg-1');

  LoftImages.prototype.isSvg = function() {
    return false;
  };
  images.init();
  images.processSvgImage($image);
  assert.strictEqual($image.attr('src'), "images/svg.png", 'Non-svg version applied in non-svg environment.');


  LoftImages.prototype.isSvg = function() {
    return true;
  };
  images.init().processSvgImage($image.attr('src', ''));
  assert.strictEqual($image.attr('src'), "images/svg.svg", 'Retina version applied in svg environment.');
});

QUnit.test("Assert processRetinaImage() handles non-jQuery argument.", function(assert) {
  LoftImages.prototype.isRetina = function() {
    return false;
  };
  images.init();

  var image    = document.getElementsByClassName('retina-1');
  image = image[0];
  assert.ok(image, 'Image selected using native code.');
  images.processRetinaImage(image);

  assert.strictEqual(image.getAttribute('src'), "images/bitmap.jpg", 'Non-retina version applied in non-retina environment.');  
});

QUnit.test("Assert processRetinaImage() works with default settings.", function(assert) {
  var $image   = $('#test .retina-1');

  LoftImages.prototype.isRetina = function() {
    return false;
  };
  images.init().processRetinaImage($image);
  assert.strictEqual($image.attr('src'), "images/bitmap.jpg", 'Non-retina version applied in non-retina environment.');


  LoftImages.prototype.isRetina = function() {
    return true;
  };
  images.init().processRetinaImage($image.attr('src', ''));
  assert.strictEqual($image.attr('src'), "images/bitmap@2x.jpg", 'Retina version applied in retina environment.');
});

QUnit.test("Able to instantiate and find version.", function(assert) {
  var loftImages = new LoftImages();
  assert.ok(loftImages instanceof LoftImages);
  assert.ok(loftImages.version);
});


//
//
// Per test setup
//
QUnit.testStart(function (details) {
  // By removing before a test, the final test will always leave the last
  // set of DOM manipulations for easier debugging.
  $('#test').replaceWith(QUnit.storage.$template.clone().attr('id', 'test'));
  images = new LoftImages({autoProcessDom: false});
});

QUnit.testDone(function () {
  LoftImages.prototype = QUnit.storage.prototype;
  $('html').attr('class', QUnit.storage.htmlClass);
});

