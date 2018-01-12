ABOUT opin_base
-----------

opin_base is a theme based on the core Stable theme. The goal is to create a reusable base theme that uses elements from the methodology known as BEM. See http://getbem.com/ for more information.


INSTALL instructions
-------

1) Enable theme either through the Appearance page or using drush.

2) Change theme files to match your project’s name. This can be done through a find and replace in your IDE or manually by changing the following file names and the content contained within:

- yourtheme.breakpoints.yml
- yourtheme.info.yml
- yourtheme.libraries.yml
- yourtheme.theme

GENERAL How-to
------

- To use sass, use npm install in the /assets folder to install the relevant GULP folder. You can then run gulp in terminal to start the compiler which will convert the sass files into css.

- All the default theme template files are based on Stable and adjustments from previous projects we felt were useful. Feel free to delete them if not in use. All core default twig files can be found in core/themes/stable/templates

## Naming Conventions

See http://getbem.com/naming/ for more information on naming conventions for the BEM methodology.

BEM: BLOCK __ ELEMENT __ MODIFIER

Essentially the goal here is for everyone to speak the same css language, which should make it easier for future developers to come in and change without going through the trouble of figuring out what a css class means. Here are some examples in drupal:

.node
.node__title
.node__title--hidden

block = node
title = element
hidden = modifier

Look familiar? This is similar to how drupal core handles css architecture ( https://www.drupal.org/docs/develop/standards/css/css-architecture-for-drupal-8 ) but more simple. Much of the same concepts can be taken from that article as well.

Below is an example of how you can apply BEM with Drupal. This is for a Article node with the full view mode display but : 

article--full
article__title--full
article__read-more--full--hover

You can modify this formula however you need it, but the base concept should remain the same: BLOCK__ELEMENT--MODIFIER

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