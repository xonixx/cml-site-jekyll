var shufflemeHackathons = (function($) {
  "use strict";
  let $grid = $("#about-hackathons #grid"), //locate what we want to sort
    $filterOptions = $("#about-hackathons .portfolio-sorting li"), //locate the filter categories
    $sizer = $grid.find(".shuffle_sizer"), //sizer stores the size of the items
    shuffler,
    init = function(onInit) {
      // None of these need to be executed synchronously
      setTimeout(function() {
        setupHackathonsFilters();
        onInit();
      }, 100);

      // instantiate the plugin
      shuffler = new Shuffle($grid[0], {
        itemSelector: '[class*="col-"][data-groups]',
        sizer: $sizer[0]
      });
    };

  // Set up button click
  let setupHackathonsFilters = function() {
      let $btns = $filterOptions.children();
      $btns.on("click", function(e) {
        e.preventDefault();
        let $this = $(this),
          group = $this.data("group");

        loadImages(group);

        // Hide current label, show current label in title
        $("#about-hackathons .portfolio-sorting li a").removeClass("active");
        $this.addClass("active");

        $("#about-hackathons .filter-elements").text(group);

        $("#about-hackathons .portfolio-sorting").addClass("mobile-hidden");
        $("#about-hackathons .portfolio-display-mobile-element").removeClass("selected");
        // Filter elements
        shuffler.filter(group);

        $grid
          .find("li")
          .filter(function(i, e) {
            let $img = $(this).find("img");
            $img.removeAttr("data-bp");
            let groups = $(e).data("groups");
            if (!groups) return false;
            let isSelectedGrp = groups.indexOf(group) >= 0;
            if (isSelectedGrp && $img.length) {
              $img.attr(
                "data-bp",
                ($img.attr("src") || $img.data("src")).replace("Converted120", "Converted300")
              );
            }
            return isSelectedGrp;
          })
          .find(".portfolio-item a")
          .off("click.bigpicture")
          .on("click.bigpicture", function(e) {
            e.preventDefault();
            BigPicture({
              el: e.target,
              gallery: "#grid"
            });
          });
      });

      $btns = null;
    },
    // Re layout shuffle when images load. This is only needed
    // below 768 pixels because the .picture-item height is auto and therefore
    // the height of the picture-item is dependent on the image
    // I recommend using imagesloaded to determine when an image is loaded
    // but that doesn't support IE7
    loadImages = function(insideGroup) {
      let debouncedLayout = $.throttle(300, function() {
        shuffler.update();
      });

      // Get all images inside shuffle selected group
      $grid
        .find("li")
        .filter(function(i, e) {
          let groups = $(e).data("groups");
          if (!groups) return false;
          return groups.indexOf(insideGroup) >= 0;
        })
        .find("img")
        .each(function() {
          // If none of the checks above matched, simulate loading on detached element.
          $(this).on("load", function() {
            $(this).off("load");
            debouncedLayout();
          });

          this.src = $(this).data("src");
        });

      // Because this method doesn't seem to be perfect.
      setTimeout(function() {
        debouncedLayout();
      }, 500);
    };

  return {
    init: init
  };
})(jQuery);

$(function() {
  $("#about-hackathons .portfolio-display-mobile-list").on("click", function() {
    console.log("Clicked on", this);
    $("#about-hackathons .portfolio-sorting").toggleClass("mobile-hidden");
    $("#about-hackathons .portfolio-display-mobile-element").toggleClass("selected");
  });

  $("#about-hackathons").one("inview", () => {
    $(this)
      .find(".container")
      .show();

    shufflemeHackathons.init(function() {
      $('#about-hackathons a[data-group="eoshk"]').click();
    });
  });
});