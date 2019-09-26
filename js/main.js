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

      // For each element with data-toggle="collapse", get the target of that element
      // and collapse it.
      $('[data-toggle="collapse"]').each(function (index, elem) {
        $($(elem).data('target')).collapse('hide');
      });
    });
  });



  // Begin code for changing the section text based on scroll.

  var elementToUpdateSelector = '#scroll-varied-section-description'

  // Keys should be jQuery selectors. Values are the text to display.
  var scrollElementText = [
    { selector: '#work_architecture', text: 'Architecture', },
    { selector: '#work_graphic',      text: 'Graphic',      },
    { selector: '#work_product',      text: 'Product',      },
    { selector: '#prose_publication', text: 'Publication',  },
    { selector: '#prose_blog',        text: 'Blog',         },
  ];

  // Requires jQuery, expects it defined as $.
  // Accesses elementToUpdateSelector and scrollElementsToText via closure.
  var onScroll = function () {
    var viewportHeight = window.innerHeight;

    scrollElementText.forEach(function (elem) {
      var $queryResult = $(elem.selector);
      if ($queryResult.length !== 1) {
        alert('Error: expected exactly 1 result for selector: ' + elem.selector);
      }

      // The range at which to start displaying the text is when the element is scrolled
      // to at least the midpoint of the page.
      //
      // The 75 is just a fudge factor to correct for the fact that the actual section
      // headings lie below the ID'd spans we're targeting.
      elem.rangeStart = $queryResult.offset().top - (viewportHeight / 2) + 70
    });

    // Elements further down the page appear later in the array.
    scrollElementText.sort(function (a, b) {
      return a.rangeStart - b.rangeStart;
    });

    var currentScrollY = window.scrollY;
    scrollElementText[0].rangeStart = 0;

    // Actually set the inner text of the target element based on the current
    // scroll position.
    //
    // Javascript doesn't have a built-in way to break out of loops early, so
    // do that in a hacky way by returning true from Array#some.
    var last = null;
    scrollElementText.some(function (elem) {
      // On the first loop, just set up last as the first element:
      if (last === null) {
        last = elem;
        return false;
      }

      if (last.rangeStart < currentScrollY && currentScrollY < elem.rangeStart) {

        var $target = $(elementToUpdateSelector)
        if ($target.length !== 1) {
          alert('Error: expected exactly 1 result for selector: ' + elementToUpdateSelector);
        }

        $target.text(last.text);
        return true;
      }

      last = elem;
      return false;
    });

    // Remove the rangeStart property set on scrollElementText elements.
    // This isn't necessary unless the elements change position on the page,
    // but it's better to recalculate their offsets each time to be safe.
    scrollElementText.forEach(function (elem) {
      delete elem.rangeStart;
    });
  }

  // Run the debounced onScroll when the document scrolls.
  document.addEventListener('scroll', debounce(onScroll), { passive: true });

  // Run the function for the first time so the content looks good before any
  // scrolling has occurred.
  onScroll();

})();






