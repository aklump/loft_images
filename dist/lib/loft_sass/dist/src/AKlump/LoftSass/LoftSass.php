<?php
/**
 * @file
 * Defines the LoftSass class.
 *
 * @ingroup loft_sass
 * @{
 */
namespace AKlump\LoftSass;

/**
 * Represents a LoftSass object class.
 * 
 * @brief Server side compliment to loft_sass SASS solution.
 */
class LoftSass {

  protected $options = array();
  
  public function __construct(Array $options = NULL) {
    $options = isset($options) ? $options : array();
    $this->options = $options + array(
      'selector' => '&',
    );
  }
  
  public function fontSize($size, $lineHeight = NULL, $important = FALSE) {
    $fs = $size instanceof Unit ? $size : new Unit($size);

    if (strval($fs) === '') {
      throw new \InvalidArgumentException("Cannot recognize font size of: $size");
    }

    $lines2   = array();
    $lines2[] = 'font-size: ' . strval($fs->units('px')) . ';';
    $lines2[] = 'font-size: ' . strval($fs->units('rem')) . ';';
    
    $lines = array();
    $lines[] = $this->options['selector'] . ' {';
    $lines[] = '  ' . $lines2[0];
    $lines[] = '  ' . $lines2[1];

    if (($vw = strval($fs->units('vw')))) {
      $lines[]     = '  font-size: ' . $vw . ';';
    }

    if ($lineHeight) {
      $lines[] = '  line-height: ' . $lineHeight . ';';
    }

    $lines[] = '}';

    if ($fs->max()) {
      $max = $fs->max()->units('px');
      $lines[] = "@media (min-width: " . (($max->value() + 1) . $max->units()) . ") {";
      $lines[] = '  ' . $this->options['selector'] . ' {';
      foreach ($lines2 as $l) {
        $lines[] = '    ' . $l;
      }
      $lines[] = '  }';
      $lines[] = '}';
    }

    return implode(PHP_EOL, $lines);
  }

  /**
   * Compresses an array into a string and removes whitespace.
   *
   * This will remove all whitespace, so things like content: " " would get
   * broken using this, so beware!
   *
   * @param  string|array $css
   *
   * @return string
   */
  public static function compressCss($css) {
    if (is_array($css)) {
      $css = implode(PHP_EOL, $css);
    }

    return preg_replace('/\s+/', '', $css);
  }
  
}
