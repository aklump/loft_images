/**
 * @file
 * An example integration with https://www.drupal.org/project/auto_retina
 *
 */
(function ($) {
  Drupal.myModuleOrThemeName = Drupal.myModuleOrThemeName || {};
  Drupal.behaviors.myModuleOrThemeName =
    Drupal.behaviors.myModuleOrThemeName || {};

  Drupal.behaviors.myModuleOrThemeName.attach = function (context, settings) {
    // If using https://www.drupal.org/project/auto_retina this will pull
    // in it's settings; NOTE YOU WILL HAVE TO ENABLE JS SUPPORT ON THAT
    // MODULE IN IT'S SETTINGS FILE BEFORE THIS WORKS.
    settings.autoRetina = settings.autoRetina || {};
    var images = new LoftImages({
      retinaSuffix: settings.autoRetina.suffix || '@2x',
    });
  };
})(jQuery);
