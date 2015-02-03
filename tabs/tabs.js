;(function(w, doc) {
  
  "use strict";
  
  var tabControl = doc.querySelectorAll('.tab-control'),
      tabControlCount = tabControl.length,
      i,
      toggleClass = function(parent, tab) {
    
        var self = tab,
            anchor = tab.querySelectorAll('a')[0],
            tabGroup = parent.getAttribute('data-tabgroup');
        
        // using a handler instead of a listener for IE8
        anchor.onclick = function() {
         
          var target = this,
              href = target.getAttribute('href').split('#')[1],
              targetContent = doc.getElementById(href),
              tabGroupObj = doc.querySelectorAll('[data-tabcontent="' + tabGroup + '"]')[0];
           
          if(!tab.classList.contains('is-active')) {
            
            parent.querySelectorAll('.is-active')[0].classList.remove('is-active');
            tabGroupObj.querySelectorAll('.is-active')[0].classList.remove('is-active');
            
            tab.classList.add('is-active');
            targetContent.classList.add('is-active');
         
            return false;
          }
          
       };
        
      }; // toggleClass()
  
  if ( tabControlCount ) {
    for (i = 0; i < tabControlCount; i = i + 1) {
      
      var self = tabControl[i],
          tabs = self.querySelectorAll('.tab-item'),
          tabCount = tabs.length,
          h;
      
      if( tabCount ) {
        for (h = 0; h < tabCount; h = h + 1) {
          
          var tab = tabs[h];
          
          toggleClass(self, tab);
          
        } // for h
      } // if tabCount
      
    } // for i
  } // if tabControlCount
  
} )( this, this.document );