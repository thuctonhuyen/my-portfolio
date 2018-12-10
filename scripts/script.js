var ACTIVE = 'active';
var INACTIVE = 'inactive';
var WITH_NAV = 'with-nav';
var sideBarClassName = 'sidebar';
var sideBarSelector = '.' + sideBarClassName;
var dataAttribute = 'data-attr';
var mainSectionClassName = 'main-section';
var mainSectionSelector = '.' + mainSectionClassName;
var mainSectionSideBarMenuIconClassName = 'header__menu-icon';
var mainSectionSideBarMenuIconSelector = '.' + mainSectionSideBarMenuIconClassName;
var sideBarListItemClassName = 'sidebar__list-item';
var sideBarListItemSelector = '.' + sideBarListItemClassName;
var mainSectionContentArticleClassName = 'main-section__content-article';
var mainSectionContentArticleSelector = '.' + mainSectionContentArticleClassName;


$(document).ready(function () {
  var getIdentifiderClassName = function (identierType, className) {
    return identierType ? className + '--' + identierType : '';
  }

  var toggleIdentifierClassName = function ($selector, className, identifiers) {
    if ($selector && className && Array.isArray(identifiers) && identifiers.length > 0) {
      for (index in identifiers) {
        var identifier = identifiers[index]
        identifier && $selector.toggleClass(getIdentifiderClassName(identifier, className));
      }
    }
  };

  $(mainSectionSideBarMenuIconSelector).on('click', function (e) {
    var status = $(sideBarSelector).attr(dataAttribute)
    if (status === INACTIVE || status === ACTIVE) {
      /* start handling data for sidebar */
      toggleIdentifierClassName($(sideBarSelector), sideBarClassName, [ACTIVE, INACTIVE])
      status === INACTIVE ? $(sideBarSelector).attr(dataAttribute, ACTIVE) : $(sideBarSelector).attr(dataAttribute, INACTIVE)
      /* end handling data for sidebar */

      /* start handling data for main section */
      toggleIdentifierClassName($(mainSectionSelector), mainSectionClassName, [WITH_NAV]);
      /* end handling data for main section */

      /* start handling data for main section sidebar menu icon */
      toggleIdentifierClassName($(mainSectionSideBarMenuIconSelector), mainSectionSideBarMenuIconClassName, [ACTIVE, INACTIVE]);
      /* end handling data for main section sidebar menu icon */
    }

    e.stopPropagation();
  });

  $(sideBarListItemSelector).on('click', function (e) {
    $currentActiveListItem = $('.' + getIdentifiderClassName(ACTIVE, sideBarListItemClassName))
    toggleIdentifierClassName($currentActiveListItem, sideBarListItemClassName, [ACTIVE]);
    toggleIdentifierClassName($(this), sideBarListItemClassName, [ACTIVE])

    // bring the right slide:
    var targetDataAttribute = $(this).attr(dataAttribute);
    if (targetDataAttribute) {
      $currentActiveMainSectionContentArticle = $('.' + getIdentifiderClassName(ACTIVE, mainSectionContentArticleClassName))
      toggleIdentifierClassName($currentActiveMainSectionContentArticle, mainSectionContentArticleClassName, [ACTIVE, INACTIVE]);

      $nextActiveMainSectionContentArticle = $('.' + mainSectionContentArticleClassName + '[' + dataAttribute + '="' + targetDataAttribute + '"]');
      toggleIdentifierClassName($nextActiveMainSectionContentArticle, mainSectionContentArticleClassName, [ACTIVE, INACTIVE]);
    }
    e.stopPropagation();

  });

})