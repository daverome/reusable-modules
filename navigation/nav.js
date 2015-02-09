;(function($, w, doc){
  
  "use strict";
  
  // Local object for method references
  var Nav = {};

  // Namespace
  Nav.ns = "Navigation";

  // Start defining methods here
  Nav.isScreenSize = function( sizeString ) {

    var size = window.getComputedStyle(document.body,':before').getPropertyValue('content');

    if( size && size.indexOf( sizeString ) !=-1 ) {
      return true;
    } else {
      return false;
    }

  };

  Nav.createSmallView = function(parentMenu, subMenu) {
    
    // don't run this code if it already ran, please
    if( parentMenu.hasClass('responsive-nav') ) {
      return;
    }
    
    var anchorText = parentMenu.find('a').first().text();
    var idSlug = anchorText.toLowerCase().replace(/ /g,"-");
    var randomNumber= Math.floor( Math.random()*9999 );
    var slug = idSlug + randomNumber;
    
    subMenu.attr('aria-expanded', 'false').attr('id', slug);
    parentMenu.addClass('is-expandable').addClass('responsive-nav');
    parentMenu.find('a').first().after('<button type="button" aria-controls="' + slug + '" class="ui-toggle-button" data-text="close">open</button>');
    
    parentMenu.find('.ui-toggle-button').first().on('click', function() {
      
      var button = $(this);
      var buttonText = button.text();
      var inverseText = button.attr('data-text');
      
      if( subMenu.attr('aria-expanded') === 'false' ) {
        subMenu.attr('aria-expanded', 'true');
        subMenu.focus();
      } else {
        subMenu.attr('aria-expanded', 'false');
        button.focus();
      }
      
      // toggle the button text
      button.attr('data-text', buttonText).text(inverseText);

    });
    
  }; // Nav.createSmallView

  Nav.destroySmallView = function(parentMenu, subMenu) {
  
    subMenu.removeAttr('aria-expanded');
    parentMenu.removeClass('is-expandable');
    parentMenu.find('.ui-toggle-button').remove();
    parentMenu.removeClass('responsive-nav');
  
  }; // Nav.destroySmallView

  // Menu toggle
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
    var parentMenu = self;
    var menuChildren = self.children().length;
    var subMenu = self.find('ul').first();
    var subMenuAnchor;
    var parentContainer;
    var subMenu;
    
    // check to see if any menus have children
    if(menuChildren > 1) {

      subMenuAnchor = self.find('.menu-sub').find('a');

      // add class for children flag
      self.addClass('has-children');
      
      subMenu = self.find('.menu-sub');
      
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
      
      if( Nav.isScreenSize( 'mediumscreen' ) || Nav.isScreenSize( 'smallscreen' ) ) {
        Nav.createSmallView(parentMenu, subMenu);
      }

    } // if has children

  }); // each menu-item

  // Resize event to create and destory the small screen navigation
  if( $('.menu-item.has-children').length > 0 ) {
    $(window).on('resize', function() {

      if( Nav.isScreenSize( 'mediumscreen' ) || Nav.isScreenSize( 'smallscreen' ) ) {
        
        $(('.menu-item.has-children')).each(function(){
          
          var parentMenu = $(this);
          var subMenu = parentMenu.find('.menu-sub');
          
          Nav.createSmallView(parentMenu, subMenu);

        }); // each menu with children

      } else {

        $(('.menu-item.has-children')).each(function(){
          
          var parentMenu = $(this);
          var subMenu = parentMenu.find('.menu-sub');
          
          Nav.destroySmallView(parentMenu, subMenu);
        
        }); // each menu with children

      }

    }); // resize
  }// if has-children

} )( jQuery, this, this.document );