<?php
/**
 * @file
 * Form template functions.
 */


 /**
  * Implements hook_preprocess_HOOK().
  */

 function uor_preprocess_bef_checkboxes(&$variables) {
   // Avoid displaying duplicate ids for checkboxes.
   $variables['attributes']['id'] = str_replace('--wrapper', '-bef--wrapper', $variables['attributes']['id']);
 }

 function uor_preprocess_bef_radios(&$variables) {
   // Avoid displaying duplicate ids for radios.
   $variables['attributes']['id'] = str_replace('--wrapper', '-bef--wrapper', $variables['attributes']['id']);
 }

 function uor_form_views_exposed_form_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state, $form_id) {
   if($form_id == 'views_exposed_form'){
      $form['keywords']['#attributes']['placeholder'] = t('Search...');
   }
}
