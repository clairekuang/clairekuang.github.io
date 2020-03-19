// Smooth scroll support for safari, internet explorer, microsoft edge, and opera next
// The following line of code is the contents of
//   https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js
// Linked from https://github.com/iamdustan/smoothscroll -- downloaded 2020-03-19.
// We could also have loaded smoothscroll.min.js in the index.html with a script tag.
!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){for(;o!==t.body&&!1===(e=p(l=o,"Y")&&a(l,"Y"),r=p(l,"X")&&a(l,"X"),e||r);)o=o.parentNode||o.host;var l,e,r;return o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();

// Use an IIFE to avoid adding or affecting variables in the global scope.
(function() {

  var updateDateTime = function () {
    var d = new Date();
    document.getElementById("year").innerHTML = d.getFullYear();
    document.getElementById("time").innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + (("00" + d.getSeconds()).slice(-2));
    setTimeout(updateDateTime, 1000);
  }

  updateDateTime();

  // From: https://pqina.nl/blog/applying-styles-based-on-the-user-scroll-position-with-smart-css/
  // This is not the original debounce code: I ran it through https://babeljs.io/repl for
  // compatibility with out-of-date browsers, which is why it's not easy to read.
  //
  // Used to improve performance for interactive things based on the browser's repaint schedule,
  // search "requestAnimationFrame" for more info.
  var debounce = function debounce(fn) {
    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    var frame;

    // The debounce function returns a new function that can receive a variable number of arguments
    return function () {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) {
        cancelAnimationFrame(frame);
      } // Queue our function call for the next frame

      frame = requestAnimationFrame(function () {
        // Call our function and pass any params we received
        fn.apply(void 0, params);
      });
    };
  };


  // If on desktop, the user clicks outside the main content body (and isn't clicking a
  // link in the left column), collapse all collapsible elements.
  document.addEventListener('click', function (event) {
    // For performance, re-queue this at the end of the JS event loop's
    // current execution queue so it doesn't slow down rendering any immediate
    // responses to the click.
    setTimeout(function () {
      var $target = $(event.target);

      // Don't do anything if the user's using the mobile version. The
      // 1000 here should be the same as the breakpoint defined in the
      // @media queries in main.css.
      if (window.innerWidth < 1000) { return; }

      // Don't do anything if the click was in the main column.
      if ($target.closest('#main-centerwidth').length !== 0) { return; }

      // Don't do anything if the click was in the list of links in the left column.
      if ($target.closest('#sidenav-link-list').length !== 0) { return; }

      $('.collapse').collapse('hide');
    });
  });

  var isMobile = function () {
    return window.innerWidth <= 900;
  };

  var rangeStart = function (elem) {
    return $(elem).offset().top - (window.innerHeight / 2) + 70;
  };

  // Helper code used for the scroll-varied sidebar text and the
  // next project button.
  // Requires jQuery, expects it to be defined as $.
  var currentScrollProjects = function () {
    var scrollElements = $(
      isMobile() ? '.mobile-scroll-varied-sidebar-text' : '.desktop-scroll-varied-sidebar-text'
    ).map(function (index, elem) {
      return {
        elem: elem,
        text: $(elem).text().trim(),
      };
    }).toArray();

    scrollElements.forEach(function (elemObject) {
      // The range at which to start displaying the text is when the element is scrolled
      // to at least the midpoint of the page.
      //
      // The 75 is just a fudge factor to correct for the fact that the actual section
      // headings lie below the ID'd spans we're targeting.
      elemObject.rangeStart = rangeStart(elemObject.elem);
    });

    // Elements further down the page appear later in the array.
    scrollElements.sort(function (a, b) { return a.rangeStart - b.rangeStart; });

    scrollElements[0].rangeStart = -1;
    return scrollElements;
  };

  // Returns an object of the form:
  // {
  //    elem:
  //    text: "..."
  // }
  //
  // Where the value of 'elem' is an element with the scroll-varied-sidebar-text
  // CSS class, used as an anchor for that feature.
  var currentlyScrolledProject = function () {
    var last = null;
    var found = null;
    var currentScrollY = window.scrollY;

    // If we don't add this dummy element at the end, the text won't update on
    // the last time through the loop, and won't work for the last project on
    // the page.
    // Javascript doesn't have a built-in way to break out of loops early, so
    // do that in a hacky way by returning true from Array#some.
    (currentScrollProjects().concat({
      rangeStart: Number.POSITIVE_INFINITY,
    })).some(function (elem) {
      // On the first loop, just set up last as the first element:
      if (last === null) {
        last = elem;
        return false;
      }

      if (last.rangeStart < currentScrollY && currentScrollY < elem.rangeStart) {
        found = last;
        return true;
      }

      last = elem;
      return false;
    });

    if (found === null) {
      // console.log();
      throw("Error: didn't find a scroll-varied-sidebar-text element on the page.");
    }
    return found;
  };




  // Actually set the inner text of the target element based on the current
  // scroll position.
    var onScroll = function () {
        var elementToUpdateSelector = '#scroll-varied-section-description'

        var currentProject = currentlyScrolledProject();
        var $target = $(elementToUpdateSelector)
        if ($target.length !== 1) {
            alert('Error: expected exactly 1 result for selector: ' + elementToUpdateSelector);
        }

        $target.text(currentProject.text);
    };

  // Run the debounced onScroll when the document scrolls.
  document.addEventListener('scroll', debounce(onScroll), { passive: true });

  // Run the function for the first time so the content looks good before any
  // scrolling has occurred.
  onScroll();


  $('#scroll-to-next-project, #next-arrow-desktop').click(function () {
    var projects = currentScrollProjects();
    var currentProject = currentlyScrolledProject();

    for (i = 0; i < projects.length; i++) {
      if (currentProject.rangeStart === projects[i].rangeStart && i !== (projects.length - 1)) {
        $([document.documentElement, document.body]).animate({
            scrollTop: rangeStart(projects[i + 1].elem) + 135,
            behavior: 'smooth'
        }, 0);
        break;
      }
    }
  });

})();






