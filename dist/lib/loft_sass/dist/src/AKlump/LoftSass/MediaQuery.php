<?php
/**
 * @file
 * Defines the MediaQuery class.
 *
 * @ingroup name
 * @{
 */
namespace AKlump\LoftSass;

/**
 * Represents a MediaQuery object class.
 * 
 * @brief Stores the information about a single media query.
 */
class MediaQuery {

  protected $data;
  
  public function __construct($string) {
    $this->source = $string;
    $this->data = array(
      'min' => NULL,
      'max' => NULL,
      'media' => NULL,
    );

    if (preg_match('/min-width:\s*([^)]+)/', $string, $matches)) {
      $this->data['min'] = new Unit($matches[1]);
    }
    if (preg_match('/max-width:\s*([^)]+)/', $string, $matches)) {
      $this->data['max'] = new Unit($matches[1]);
    }
    $this->data['media'] = !(strpos($string, '@media') === FALSE);
  }

  public function __toString() {
    $output   = $this->source;

    if (!$this->data['media']) {
      $output = '@media {' . $this->source . '}';
    }

    if ($this->data['min']) {
      $output = preg_replace('/(@media[^{]+){/', '$1and (min-width: ' . strval($this->data['min']) . ') {', $output);
    }
    
    if ($this->data['max']) {
      $output = preg_replace('/(@media[^{]+){/', '$1and (max-width: ' . strval($this->data['max']) . ') {', $output);
    }

    $output = str_replace('@media and', '@media', $output);
    
    return $output;
  }
  

  public function min($value = NULL) {
    if (!isset($value)) {
      return $this->data['min'];
    }
    $this->data['min'] = new Unit($value);
    
    return $this;
  }

  public function max($value = NULL) {
    if (!isset($value)) {
      return $this->data['max'];
    }
    $this->data['max'] = new Unit($value);
    
    return $this;
  }
}
