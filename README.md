ABOUT opin_base
-----------

opin_base is a theme based on the core Stable theme.


INSTALL instructions
-------

1) Enable theme either through the Appearance page or using drush.

2) Change theme files to match your project’s name. This can be done through a find and replace in your IDE or manually by changing the following file names and the content contained within:

- opin_base.breakpoints.yml
- opin_base.info.yml
- opin_base.libraries.yml
- opin_base.theme

GENERAL How-to
------

- To use sass, npm install your gulp files from within the assets directory.

- All the default theme template files from Classy are included in here. Feel free to delete if not in use. Mostly included to make it easier to find classy template files. Otherwise, copy and modify to your desires.

## Naming Conventions

Note: need to rewrite as we experience it

### Sass files 

(modifier, view mode)

  * modifier = block, node, paragraph, etc
    ** event
  * view mode = view mode of the node, block, etc. Also the view display.
    ** teaser

  * Example: Event content type node on a full-page view mode. The sass file for this would likely be:

    *** event--full

  * General Notes: 

    ** As you update regions, Make sure to update the sass files, classes, and template files.

### CSS Classes

Should follow a similar structure as Sass files which is based on: modifier--view-mode--element

  * .event--full
  * .event--full--field-date

However, there are cases where it makes sense to break away from this structure:

  * layout classes.
  ** Any classes related to the general layout of the page should be prefixed with "l-", the l which stands for "layout". This is to help differentiate layout classes from the rest. Especially since .l classes can handle max width for specific layouts.

  *** Example: l-region

  * Reusable Elements. 
  ** When you have an element - like a button - which will be reused around the site multiple times. You can make it an Extend or a class or both!

  *** Example: 

      %blue--button {
        background: blue;
      }

    // Can then be extended to be used in a class...

      .blue--button {
        @extend %blue--button;
      }

    // Can also be extended but slightly modified in another class

      .blue--button--modified{
        @extend %blue--button;
        color: white;
      }


  * States.
  ** When states are involved. For instance, you have a specific class you want to add and remove from an element when it is enabled. For this, you would use: element--state

  *** Example: button--hover

  ** This is particularly useful if you wanted to update an element in javascript.
  



  * l-constrain div = max width for layouts
  ** If it is a general class to be reused around the site, you 
  * state = hover, active, focus, etc
  * view mode = …well view mode of the node, block 
    ** region__example--hover
    ** example: l-main, l-header



## Sass Breakpoints

These are breakpoints which will be used around the site. In Sass, functions like mappy-bp and typi will use these breakpoints to determine what widths will be affected.

* phone-portrait   (320px)
* phone-landscape  (568px)
* tablet-portrait  (768px)
* tablet-landscape (960px)
* desktop-small    (1024px)
* desktop-medium   (1200px)
* desktop-large    (1400px)
* desktop-wide     (1700px)

## Typi for Typography Management

In your sass structure, you will notice in the global settings a type directory. In this directory, you will find all the necessary means for adjusting font styling around the site, including methods to automatically adjust font size.

**type/typi.scss contains:**

* $modularscale - Base font and ratio sizes which can be leveraged throughout sass.
* $typi - Set font sizes for particular elements based on line height

These settings can then be used in the /type/type.scss folder to assign to elements such as h1. This will automatically determine the size on each breakpoint.
  
Tip: Make sure to use gulps browser utility to adjust the sizes and see in realtime.

These settings can then be leveraged in other places using vr() as the value. vr() is based on the line-height. So if the base line-height is 1.4, a vr(1) will return 1.4 as the value, but in px. So vr(0.25) will return a quarter of the value (25%) of 1.4…which equals 0.35.

margin-top: vr(.25);

returns something like…

margin-top: 4px; 

## Other Info

…