<?php



/**
 * Implements theme_suggestions_taxonomy_term_alter()
 *
 * @param $suggestions
 * @param $variables
 */
function opin_base_theme_suggestions_taxonomy_term_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'taxonomy_term__' . $variables['elements']['#view_mode'];
}


/**
 * Implements hook_theme_suggestions_block_alter().
 */
function opin_base_theme_suggestions_block_alter(array &$suggestions, array $variables, $hook){
  if (!empty($variables['elements']['content']['#block_content'])) {
    //creates template theme suggestion for custom block type
    array_splice($suggestions, 1, 0, 'block__bundle__' . $variables['elements']['content']['#block_content']->bundle());
    // Get bundle/block type.
  }
}
