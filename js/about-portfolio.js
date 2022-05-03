//need for mobile in scrolling portfolio items
var toTopScroll = false;
if($(window).width() < 768) {
  var lastScrollTop = 0;
  window.addEventListener("scroll", function(){
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) toTopScroll = false;
    else toTopScroll = true;

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
}

var portfolioFiltersChosen = [];
var shufflemePortfolio = (function($) {
  "use strict";
  let $grid = $("#grid-portfolio"), //locate what we want to sort
    $filterOptions = $("#about-portfolio .portfolio-sorting li"), //locate the filter categories
    $sizer = $grid.find(".shuffle_sizer"), //sizer stores the size of the items
    shuffler,
    init = function(onInit) {
      // None of these need to be executed synchronously
      setTimeout(function() {
        showPortfolioContent();
        setupPortfolioFilters();
        onInit();
      }, 100);

      // instantiate the plugin
      shuffler = new Shuffle($grid[0], {
        itemSelector: '[class*="col-"][data-groups]',
        sizer: $sizer[0]
      });
    };

  // Set up button clicks
  let setupPortfolioFilters = function() {
    let $btns = $filterOptions.children();
    $btns.on("click", function(e) {
      e.preventDefault();
      let $this = $(this),
        group = $this.data("group");
      console.log("this element of active class " + $this);

      console.log("group " + group);

      if ($this.hasClass("active")) {
        return;
      } else {
        $("#about-portfolio .portfolio-title a").removeClass("active");
        if (Array.isArray(group)) {
          portfolioFiltersChosen = group;
        } else {
          portfolioFiltersChosen = [group];
        }
        $this.addClass("active");
      }

      let portfolioFilterChosenConcat = portfolioFiltersChosen.join(", ");
      let symbolCount;
      const windowWidth = $(window).width();
      if (windowWidth < 320) symbolCount = 10;
      else if (windowWidth <= 375) symbolCount = 18;
      else symbolCount = 20;
      if (portfolioFilterChosenConcat.indexOf("all") >= 0) {
        portfolioFilterChosenConcat = "All";
      } else {
        if (portfolioFilterChosenConcat.length > symbolCount) {
          portfolioFilterChosenConcat = portfolioFilterChosenConcat.substr(0, symbolCount);
          portfolioFilterChosenConcat = portfolioFilterChosenConcat + "...";
        }
      }
      $("#about-portfolio .filter-element").text(portfolioFilterChosenConcat);

      // Filter elements
      shuffler.filter((element, shuffle) => {
        //console.log("elem: ", element);
        for (let j = 0; j < portfolioFiltersChosen.length; j++) {
          console.log("j: " + j + "; f: " + portfolioFiltersChosen[j]);
          if (
            $(element)
              .data("groups")
              .indexOf(portfolioFiltersChosen[j]) >= 0
          )
            return true;
        }
        return false;
      });

      $("#about-portfolio .portfolio-display-mobile-list").click();
    });

    $btns = null;
  };

  let showPortfolioContent = function() {
    $(".projects").on("click", function(e) {
      let gridOffset = $("#grid-portfolio").offset().top;
      let inGridOffset = 0;
      let id = this.id;
      let $elt = $("." + id);

      let projectItem = $(this).closest(".portfolio-item");
      let projectTitle = projectItem.find(".portfolio-item-title");
      let heightTitle = projectTitle.height();

      var openedPortfolio = document.querySelectorAll(".expanded > .portfolio-item");

      if ($elt.hasClass("hidden")) {
        $('[class*="-project"]').addClass("hidden");
        $("li.shuffle-item").removeClass("expanded");
        $elt.removeClass("hidden");

        $(this)
          .closest("li")
          .addClass("expanded");
        inGridOffset =
          Math.ceil(
            $(this)
              .closest("li.shuffle-item")
              .index() / 2
          ) * 526;
      } else {
        $elt.addClass("hidden");

        $(this)
          .closest("li")
          .removeClass("expanded");
        inGridOffset =
          Math.floor(
            $(this)
              .closest("li.shuffle-item")
              .index() / 2
          ) * 526;
      }

      shuffler.update();

      let isMobile = $(window).width() < 768;

      setTimeout(() => {
        let subHeader = $('.subheader-section');
        let heightSubHeader = subHeader.css('display') === 'block' ? subHeader.height() : 0;
        
        let scrollTop;
        if(isMobile) {
          if(openedPortfolio.length > 0) {
            if(toTopScroll) scrollTop = projectTitle.offset().top - heightTitle - heightSubHeader - 30;
            else scrollTop = projectTitle.offset().top - 15;
          } else {
            scrollTop = projectTitle.offset().top - 15;
          }
        } else {
          scrollTop = gridOffset + inGridOffset - heightTitle - 2 * heightSubHeader;
        }

        $("html, body").animate(
          {
            scrollTop
          },
          500
        );
      }, isMobile ? 500 : 0);
    });
  };

  return {
    init: init
  };
})(jQuery);

//Set up subheader for portfolio section

$(function() {
  shufflemePortfolio.init(function() {
    $("#about-portfolio .portfolio-display-mobile-list")
      .on("click", function() {
        $("#about-portfolio .portfolio-sorting").toggleClass("mobile-hidden");
        $("#about-portfolio .portfolio-display-mobile-element").toggleClass("selected");
      })
      .click();

    $("#filter-all").click();
  });
});
