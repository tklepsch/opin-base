<?php
/**
 * @file
 * HTML template functions.
 */


/**
* Implements hook_preprocess_html()
*/




// Add node id to the body classes
function opin_base_preprocess_html(&$variables) {

  // Add x-ua-compatible meta tag.
  $variables['page']['#attached']['html_head'][] = [
    array(
      '#tag' => 'meta',
      '#attributes' => array(
        'http-equiv' => 'x-ua-compatible',
        'content' => 'ie=edge',
      ),
    ),
    'x_ua_compatible'
  ];

  //Add a language to the body
  $variables['language'] = \Drupal::languageManager()->getCurrentLanguage()->getId();

  //Add node type class
  $node = \Drupal::routeMatch()->getParameter('node');
    if($node) {
    $variables['attributes']['class'][] = 'path-node-' . $node->id();
  }

    // Add information about the number of sidebars to body
  if (!empty(render($variables['page']['sidebar_first'])) && !empty(render($variables['page']['sidebar_second']))) {
    $variables['attributes']['class'][] = 'two-sidebars';
  }
  elseif (!empty(render($variables['page']['sidebar_first']))) {
    $variables['attributes']['class'][] = 'one-sidebar';
    $variables['attributes']['class'][] = 'sidebar-first';
  }
  elseif (!empty(render($variables['page']['sidebar_second']))) {
    $variables['attributes']['class'][] = 'one-sidebar';
    $variables['attributes']['class'][] = 'sidebar-second';
  }
  else {
    $variables['attributes']['class'][] = 'no-sidebars';
  }

}


/**
 * Implements hook_preprocess_block().
 *
 * If the variable exists set it to the variable link_var, the $vars variable is set everywhere its where you can see
 * what you have, and what you can use, we are setting a variable inside it so it gets passed to the block template.
 */

 //Add block type class
function opin_base_preprocess_block(&$vars) {
  $vars['current_language'] = \Drupal::languageManager()->getCurrentLanguage();
  $vars['theme_path'] = base_path() . $vars['directory'];

  if (!empty($vars['content']['#block_content'])) {
    // Get bundle/block type.
    $bundle = $vars['content']['#block_content']->bundle();
    // Set classname
    $vars['attributes']['class'][] = 'block--' . str_replace('_', '-', $bundle);


  if ($bundle == 'call_out') {
    if (isset($vars['content']['field_link']['0']['#url'])) {
      $vars['link_var'] = $vars['content']['field_link']['0']['#url'];

      // We now unset the field link so it doesnt show up with the label.
      unset($vars['content']['field_link']);
      }
    }
  }
}
