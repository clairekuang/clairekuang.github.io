//smooth scroll support for safari, internet explorer, microsoft edge, and opera next
//import smoothscroll from 'smoothscroll-polyfill';
//smoothscroll.polyfill();

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
    return $(elem).offset().top - 125; //125 is height of navbar, fudge factor for rangestart
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
      // to the bottom of the nav bar
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
            scrollTop: rangeStart(projects[i + 1].elem) + 2, // 2 is height of the divider bar essentially, fudge factor based on rangestart
            behavior: 'smooth'
        }, 0);
        break;
      }
    }
  });

})();







