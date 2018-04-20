/**
 * @file
 * This file is meant for smaller JavaScript/jQuery snippets used
 * throughout the whole site. Example: Sticky Header
 */

(function ($, Drupal) {

  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      // Code to be run on page load, and
      // on ajax load added here
    }
  };

  /*
   * When resizing the window, wait for the resize timer to run out
   * then we can rerun the inline functions. Will help limit how often
   * the functions run.
   */

  var resizeTimer;

  $(window).on('resize', function(){

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {

      // Insert code here

    }, 300);
  });

})(jQuery, Drupal);
