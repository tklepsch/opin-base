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

  // $(".block--phone-number-block .dropdown-content .field__item:first-of-type").addClass('active-opt');
  // $(".block--phone-number-block .dropdown-content .active-opt").prependTo(".block--phone-number-block .dropdown-content");
  // $(".block--phone-number-block .dropdown-content").on("click", "div", function() {
  //   // $(".block--phone-number-block .dropdown-content .active-opt").removeClass('active-opt');
  //   // $(this).addClass('active-opt').css(
  //   //     "display","block"
  //   // )
  //   if ($(this).parent().hasClass('dropdown-open')){
  //     // $(this).parent().removeClass('dropdown-open');
  //     $(this).children('div').toggle(300);
  //   } else {
  //     $(this).parent().addClass('dropdown-open');
  //     $(this).children('div').toggle(300);
  //   }
  //     $(".block--phone-number-block .dropdown-content .active-opt").prependTo(".block--phone-number-block .dropdown-content");
  //  });
  //   // $(".block--phone-number-block .dropdown-content").on("click", "div", function() {
  //   //     $(".block--phone-number-block .dropdown-content .active-opt").removeClass('active-opt');
  //   //
  //   //     $(this).addClass('active-opt').css(
  //   //         "display","block"
  //   //     )
  //   //     $(".block--phone-number-block .dropdown-content .active-opt").prependTo(".block--phone-number-block .dropdown-content");
  //   // });
  $(".block--phone-number-block .dropdown-content .field__item:first-of-type").addClass('active-opt');


    $(".block--phone-number-block .dropdown-content .active-opt").prependTo(".block--phone-number-block .dropdown-content");
    $(".block--phone-number-block .dropdown-content").children('div:not(.active-opt)').css(
        "display","none"
    );

    // $(".block--phone-number-block .dropdown-content").on("click", "div", function() {
    //     $(this).children('div:not(.active-opt)').css(
    //         "display","block !important"
    //     )
    // });
    // $(".block--phone-number-block .dropdown-content").mouseout( function() {
    //     $(this).children('div:not(.active-opt)').css(
    //         "display","none"
    //     )
    // });

        $(".block--phone-number-block .dropdown-content").on("click", "div", function() {
            $(this).parent().addClass('dropdown-open');
            $(".block--phone-number-block .dropdown-content .active-opt").removeClass('active-opt');
            $(this).addClass('active-opt').css(
                "display", "block"
            )
            $(this).parent().children('div:not(.active-opt)').css(
                "display", "block"
            )
            $(".block--phone-number-block .dropdown-content .active-opt").prependTo(".block--phone-number-block .dropdown-content");
        });
    //
    // $('.block--phone-number-block .dropdown-content div').keypress(function (e) {
    //     if (event.which == 13) phoneCallback();
    // });

    $(".block--phone-number-block .dropdown-content div").each(function(i) {
        $(this).attr('tabindex', i + 1);
    });

    $("body").click(function() {
        $(".block--phone-number-block .dropdown-content").children('div:not(.active-opt)').hide();
    });

    $(".block--phone-number-block .dropdown-content").click(function(e) {
        e.stopPropagation();
    });


  // A function used to expand the search block.
  function expandSearch(e){

    var textInput = document.querySelector('#block-exposedformsearchpage .form-text');
    var submit = document.querySelector('#block-exposedformsearchpage .form-submit');

    // find search input element and toggle a class to the search input
    
    textInput.classList.toggle('open--search');
    submit.classList.toggle('open--search');

    // if either text input or submit has class open--search, add aria info and shift focus.
    if(textInput.className.match('open--search') || submit.className.match('open--search')){

      $(this).attr('aria-pressed', 'true');
      $('#block-exposedformsearchpage .form-text').focus(); 

      // if esc is pressed...
    } else {
      $(this).attr('aria-pressed', 'false'); 
    }
  }

  // A function used to expand the search block.
  function closeSearch(e){
    $(this).attr('aria-pressed', 'false');
    $('#block-exposedformsearchpage .form-text').removeClass('open--search');
    $('#block-exposedformsearchpage .form-submit').removeClass('open--search');
  }

  var searchButton = document.querySelector('.search--button');

  // run function expandSearch when search button is clicked.
  searchButton.addEventListener('click', expandSearch);
  searchButton.addEventListener('keyPress', expandSearch);

  // if esc key is pressed, close search. Can be reused for other elements as well.

  $(document).keyup(function(e){
    if (e.keyCode == 27){
      closeSearch();
      $(searchButton).focus(); 
    }
  })

  // Show free-demo contact form on click or keypress of free-demo button.

  $('.free-demo button').on('click keyPress', function(){
    $('.contact-message-free-demo-form').toggle();
  });

})(jQuery, Drupal);
