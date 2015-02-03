;(function($, w, doc){
  
  "use strict";
  
  // Local object for method references
  var Nav = {};

  // Namespace
  Nav.ns = "Navigation";

  // Start defining methods here
  Nav.isScreenSize = function( sizeString ) {

    var size = window.getComputedStyle(document.body,':before').getPropertyValue('content');

    if(size && size.indexOf( sizeString ) !=-1) {
      return true;
    } else {
      return false;
    }

  };

  Nav.createSmallView = function(subMenu) {
    subMenu.attr('aria-expanded', 'false');
    //self.find('a').first().after('<button aria-controls="' + slug + '" class="sub-menu-control"><span>more</span></button>');
  };

  Nav.destroySmallView = function(subMenu) {
    subMenu.removeAttr('aria-expanded');
  };

  // menu toggle
  $('.nav-menu-toggle').on('click', function(e) {

    e.preventDefault();

    var self = $(this);
    var body = $('body');
    var targetId = self.attr('aria-controls');
    var targetZone = $('#' + targetId);

    if( body.hasClass('nav-is-active') ) {

      body.removeClass('nav-is-active');
      targetZone.attr('aria-expanded', 'false');

    } else {

      body.addClass('nav-is-active');
      targetZone.attr('aria-expanded', 'true').focus();

    }
    
  }); // menu toggle

  /*
    Set the stage for anything with children
  */

  $('.menu-item').each(function(){

    var self = $(this);
    var menuChildren = self.children().length;
    var anchorText = self.find('a').first().text();
    var idSlug = anchorText.toLowerCase().replace(/ /g,"-");
    var subMenu = self.find('ul').first();
    var randomNumber= Math.floor( Math.random()*9999 );
    var slug = idSlug + randomNumber;
    var subMenuAnchor;
    var parentContainer;

    if(menuChildren > 1) {

      subMenuAnchor = self.find('.menu-sub').find('a');

      // add class for children flag
      self.addClass('has-children');

      // focus event
      subMenuAnchor.on('focus', function() {
        $(this).closest('.menu-item.has-children').addClass('child-has-focus');
      });

      // blur event
      subMenuAnchor.on('blur', function() {

        parentContainer = $(this).closest('.menu-item.has-children');

        if( parentContainer.find('.menu-sub').find('ul > li').children(':focus').length === 0 ) {
          parentContainer.removeClass('child-has-focus');
        }

      });

      if( Nav.isScreenSize('mediumscreen') ) {

        // setting up the submenu toggle
        Nav.createSmallView( subMenu );

      }

    } // if has children

  }); // each menu-item

  // resize event
  if( $('.menu-item.has-children').length > 0 ) {
    $(window).on('resize', function() {

        var subMenu = $('.menu-item.has-children').find('ul').first();

        if( Nav.isScreenSize( 'mediumscreen' ) ) {

          Nav.createSmallView( subMenu );
          console.log('create!');

        } else {

          Nav.destroySmallView( subMenu );

        }

    }); // resize
  }// if has-children

} )( jQuery, this, this.document );