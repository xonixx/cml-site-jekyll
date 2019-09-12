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
        //listenPortfolioFilters();
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

      //console.log("arrayss " + portfolioFiltersChosen);
      let portfolioFilterChosenConcat = portfolioFiltersChosen.join(", ");
      //console.log("portfolioFilterChosenConcat "+portfolioFilterChosenConcat);
      //console.log("portfolioFilterChosenConcat.length "+portfolioFilterChosenConcat.length);
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

      /*
                     // Hide current label, show current label in title
                     $('.portfolio-sorting li a').removeClass('active');
      
                     $this.addClass('active');
                    */
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

      // $grid.find('li').filter(function (i, e) {
      //     var $img = $(this).find('img');
      //     $img.removeAttr('data-bp');
      //     let groups = $(e).data('groups');
      //     console.log("groups lalala " + groups);
      //     if (!groups)
      //         return false;
      //
      //     for(let j = 0; j < filtersChosen.length; j++) {
      //         console.log('j: '+j+"; f: "+ filtersChosen[j]);
      //         if(groups.indexOf(filtersChosen[j]) === -1) return false;
      //     }
      //     // if ($img.length) {
      //     //     $img.attr('data-bp', $img.attr('src').replace('Converted120', 'Converted300'));
      //     // }
      //     return true;
      // }).find('a')
      //     .off('click.bigpicture')
      //     .on('click.bigpicture', function (e) {
      //         e.preventDefault();
      //         BigPicture({
      //             el: e.target,
      //             gallery: '#grid'
      //         })
      //     });
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
          ) * 480;
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
          ) * 480;
      }
      $("html, body").animate(
        {
          scrollTop: gridOffset + inGridOffset - 250
        },
        500
      );
      shuffler.update();
    });
  };

  return {
    init: init
  };
})(jQuery);

//Set up subheader for portfolio section
function displaySubHeader() {
  let inAboutSection = () =>
    $(window).scrollTop() + 101 >= $("#about-portfolio").offset().top &&
    $(window).scrollTop() + 160 < $("#team").offset().top;

  $(window).scroll(function() {
    if (inAboutSection()) {
      setTimeout(function() {
        if (inAboutSection()) {
          $(".subheader-section").css({
            display: "block"
          });
        }
      }, 1000);
    } else {
      $(".subheader-section").css({
        display: "none"
      });
    }

    if (
      $(window).scrollTop() + 120 >= $("#about-portfolio").offset().top &&
      $(window).scrollTop() + 200 < $("#about-hackathons").offset().top
    ) {
      $("#portfolio-a").addClass("selected-a");
      $("#portfolio-a-mobile").addClass("selected-a");
    } else {
      $("#portfolio-a")
        .removeClass("selected-a")
        .blur();
      $("#portfolio-a-mobile")
        .removeClass("selected-a")
        .blur();
    }

    if (
      $(window).scrollTop() + 120 >= $("#about-hackathons").offset().top &&
      $(window).scrollTop() + 200 < $("#about-customers").offset().top
    ) {
      $("#hackathon-a").addClass("selected-a");
      $("#hackathon-a-mobile").addClass("selected-a");
    } else {
      $("#hackathon-a")
        .removeClass("selected-a")
        .blur();
      $("#hackathon-a-mobile")
        .removeClass("selected-a")
        .blur();
    }

    if (
      $(window).scrollTop() + 180 >= $("#about-customers").offset().top &&
      $(window).scrollTop() + 200 < $("#team").offset().top
    ) {
      $("#customers-a").addClass("selected-a");
      $("#customers-a-mobile").addClass("selected-a");
    } else {
      $("#customers-a")
        .removeClass("selected-a")
        .blur();
      $("#customers-a-mobile")
        .removeClass("selected-a")
        .blur();
    }
  });
}

$(function() {
  displaySubHeader();

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
