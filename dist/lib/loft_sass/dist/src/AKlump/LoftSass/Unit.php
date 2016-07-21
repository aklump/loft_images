<?php
/**
 * @file
 * Defines the Unit class.
 *
 * @ingroup name
 * @{
 */
namespace AKlump\LoftSass;

/**
 * Represents a Unit object class.
 *
 * @code
 *   $u = new Unit('14px')
 *   $u->value() === 14;
 *   $u->units() === 'px';
 *   strval($u) === '14px'
 *
 *   // Convert it
 *   $u->units('rem')->value === .875;
 *   $u->units('rem')->units === 'rem';
 *   strval($u->units('rem')) === '.875rem';
 *
 *   // Usage for vw
 *   $u = new Unit('14px at 1080px');
 *   strval($u->units('rem')) === '.875rem';
 *   strval($u->units('vw')) === '1.29629vw';
 *   $u->width()->value === 1080;
 *   $u->width()->units === 'px';
 *   $u->max() === FALSE;
 *
 *   $u = new Unit('14px max at 1080px');
 *   $u->max()->value === 1080;
 *   $u->max()->units === 'px';
 *
 *   // Scaling a declaration
 *   $u = new Unit('14px max at 1080px');
 *   $u->scale(2.5)->value === 30;
 *   strval($u->scale(2.5)) === '30px max at 1080px';
 *   strval($u->scale(2.5)->units('px')) === '30px';
 *
 *   
 * @endcode
 * 
 * @brief Converts unit-type strings to parts.
 */
class Unit {

  const REGEX = '/([^ ]+)(?: (max))?(?: at (.+))?/';

  protected $input, $original, $converted, $scale;

  /**
   * Converts a units-based string "16px" to and object.
   *
   * @param  string $string
   *
   * @return object
   */
  public function __construct($string, Array $options = NULL) {
    $this->input = $string;
    $this->options = isset($options) ? $options : array();
    $this->options += array(
      'rootElementSize' => 16,
    );

    preg_match(static::REGEX, $string, $matches);
    $matches += array(NULL, NULL, NULL, NULL);
    $unit = isset($matches[1]) ? $matches[1] : NULL;

    $this->width = isset($matches[3]) ? $matches[3] : NULL;
    if ($this->width) {
      $class = get_class($this);
      $this->width = new $class($this->width);
    }

    $this->max = FALSE;
    if (!empty($matches[2])) {
      $this->max = TRUE;
    }

    preg_match('/([\d-.]+)(.*)/', $unit, $matches);
    $matches += array(NULL, NULL, NULL);
    $this->original['value'] = $matches[1] * 1;
    $this->original['units'] = !empty($matches[2]) ? $matches[2] : 'px';
    // $this->original['units'] = $matches[2];

    $this->revert();
  }

  /**
   * Scale the value by a multiplier
   *
   * @param  number $multiplier
   *
   * @return this
   */
  public function scale($multiplier) {
    $this->scale = $multiplier;

    return $this;
  }

  /**
   * Revert to the original value/units.
   *
   * This can be handy if conversion rounding has caused data loss.
   *
   * @return Unit
   */
  public function revert() {
    $this->converted = array_fill_keys(array_keys($this->original), NULL);
    $this->scale     = 1;
    return $this;
  }
  
  public function value() {
    $value = isset($this->converted['value']) ? $this->converted['value'] : $this->original['value'] * $this->scale;

    return $value;
  }

  /**
   * Return the width as expressed in the original string.
   *
   * @return Unit
   */
  public function width() {
    return $this->width;
  }

  /**
   * Return the maximum Unit object based on 'max'
   *
   * @return Unit
   */
  public function max() {
    return $this->max ? $this->width : FALSE;
  }
  
  public function __toString() {
    $value = $this->value();
    if ($value === FALSE) {
      return '';
    }
    $units = !empty($this->converted['units']) ? $this->converted['units'] : $this->original['units'];
    
    $output = array();
    $output[] = $value . $units;

    if (!$this->converted['units']) {
      if ($this->max) {
        $output[] = 'max';
      }
      if ($this->width) {
        $output[] = 'at';
        $output[] = strval($this->width);
      }
    }

    return implode(' ', $output);
  }
  
  /**
   * Getter setter for the units.
   *
   * @param  string $unit
   *   Omit to return the current units.  Provide and the value will be
   *   converted to these units.
   *
   * @return string|Unit
   *   If $unit is given, the object is returned.
   */
  public function units($units = NULL) {

    // Process a conversion.
    if (isset($units)) {
      $this->converted = $this->original;
      $this->converted['value'] *= $this->scale;
      if ($this->converted['units'] !== $units) {
        $this->converted['units'] = $units;
        $method                   = "{$this->original['units']}2{$units}";
        $data = $this->original;
        $data['value'] *= $this->scale;
        $this->converted['value'] = $this->{$method}($data);
      }

      return $this;
    }

    return $this->original['units'];
  }

  protected function px2rem($data) {
    return $data['value'] / $this->options['rootElementSize'];
  }

  protected function px2vw($data) {
    if (empty($this->width)) {
      return FALSE;
    }
    return round($data['value'] / $this->width->units('px')->value() * 100, 5);
  }
  
  protected function rem2px($data) {
    return $data['value'] * $this->options['rootElementSize'];
  }
  
  protected function rem2vw($data) {
    if (empty($this->width)) {
      return FALSE;
    }
    $data['value'] = $this->rem2px($data);
    $data['units']  = 'px';
    return round($data['value'] / $this->width->units('px')->value() * 100, 5);
  }
}
