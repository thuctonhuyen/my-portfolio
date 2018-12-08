var ACTIVE = 'active';
var INACTIVE = 'inactive';
var WITH_NAV = 'with-nav';
var sideBarClassName = 'sidebar';
var sideBarSelector = '.' + sideBarClassName;
var dataAttribute = 'data-attr';
var mainSectionClassName = 'main-section';
var mainSectionSelector = '.' + mainSectionClassName;
var mainSectionSideBarMenuIconClassName = 'main-section__sidebar-menu-icon';
var mainSectionSideBarMenuIconSelector = '.' + mainSectionSideBarMenuIconClassName;
var sideBarListItemClassName = 'sidebar__list-item';
var sideBarListItemSelector = '.' + sideBarListItemClassName;


$(document).ready(function() {
  var getIdentifiderClassName = function(identierType, className) {
    return identierType ? className + '--' + identierType : '';
  }

  var toggleIdentifierClassName = function($selector, className, identifiers) {
    if($selector && className && Array.isArray(identifiers) && identifiers.length > 0) {
      for(index in identifiers) {
        var identifier = identifiers[index]
        identifier && $selector.toggleClass(getIdentifiderClassName(identifier, className));
      }
    }
  };

  $(mainSectionSideBarMenuIconSelector).on('click', function(){
    var status = $(sideBarSelector).attr(dataAttribute)
    if (status === INACTIVE || status === ACTIVE) {
      /* start handling data for sidebar */
      toggleIdentifierClassName($(sideBarSelector), sideBarClassName, [ACTIVE, INACTIVE])
      status === INACTIVE ?  $(sideBarSelector).attr(dataAttribute, ACTIVE) :  $(sideBarSelector).attr(dataAttribute, INACTIVE)
      /* end handling data for sidebar */

      /* start handling data for main section */
      toggleIdentifierClassName($(mainSectionSelector), mainSectionClassName, [WITH_NAV]);
      /* end handling data for main section */

      /* start handling data for main section sidebar menu icon */
      toggleIdentifierClassName($(mainSectionSideBarMenuIconSelector), mainSectionSideBarMenuIconClassName, [ACTIVE, INACTIVE]);
      /* end handling data for main section sidebar menu icon */
    }
  });

  $(sideBarListItemSelector).on('click', function(){
    $currentActiveListItem = $('.' + getIdentifiderClassName(ACTIVE, sideBarListItemClassName))
    toggleIdentifierClassName($currentActiveListItem, sideBarListItemClassName, [ACTIVE]);
    toggleIdentifierClassName($(this), sideBarListItemClassName, [ACTIVE])
  });

})