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
        itemSelector: '[data-groups]',
        sizer: $sizer[0]
      });
    };

  // Set up button clicks & filter portfolio projects
  let setupPortfolioFilters = function() {
    // set category from section of industrial
    let selectedCategory;
    const categoryBtns = document.querySelectorAll(".industries-item");
    
     // clean category from section of industrial
     const cleanCategory = document.getElementById("filter-all");

    categoryBtns.forEach((categoryBlock) => {
      categoryBlock.addEventListener('click', function() {
        selectedCategory = this.dataset.category;

        const filterNow = document
          .querySelector(".portfolio-title .active")
          .dataset.groups;
        const filterNowArr = Array.isArray(filterNow) ? filterNow : [filterNow];
        
        // Filter elements
        shuffler.filter((element, shuffle) => {
          let isInGroup = false;
          const parseStrGroupsInArr = JSON.parse(element.dataset.groups);
  
          /*
          * if previous filter of el. was found from has already choosen filter el. of frilter => break loop
          * else get next filter of element & check it from filters was choosen
          */
          for (let j = 0; j < filterNowArr.length; j++) {
            if(isInGroup) break;
            isInGroup = parseStrGroupsInArr.indexOf(filterNowArr[j]) >= 0;
          }

          return isInGroup;
        });

        $("#filter-all-inner-project").click();
      });
    });

    cleanCategory.addEventListener('click', function() {
      selectedCategory = null;

      // Filter elements
      shuffler.filter((element, shuffle) => {
        let isInGroup = false;
        const parseStrGroupsInArr = JSON.parse(element.dataset.groups);

        /*
         * if previous filter of el. was found from has already choosen filter el. of frilter => break loop
         * else get next filter of element & check it from filters was choosen
         */
        for (let j = 0; j < portfolioFiltersChosen.length; j++) {
          if(isInGroup) break;
          isInGroup = parseStrGroupsInArr.indexOf(portfolioFiltersChosen[j]) >= 0;
        }
        
        return isInGroup;
      });
    });


    let $btns = $filterOptions.children();
    $btns.on("click", function(e) {
      e.preventDefault();

      // which a filter was clicked(All, Java, Reactjs)
      let $this = $(this),
        group = $this.data("group");

      // close all projects when switch between: Java, Swift, etc.
      const projects = document.querySelectorAll(".projects");
      projects.forEach(project => {
        const item = project.closest("li");
        const isOpened = item.classList.contains("expanded");
        if(isOpened) {
          item.classList.remove("expanded");
          const elms = document.querySelectorAll(`.${project.id}`);
          elms.forEach(el => el.classList.add("hidden"));
        }
      });
      $("li.shuffle-item").removeClass("expanded");
      shuffler.update();
      // end code of category <close all projects>


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
        let isInGroup = false;
        const parseStrGroupsInArr = JSON.parse(element.dataset.groups);

        /*
         * if previous filter of el. was found from has already choosen filter el. of frilter => break loop
         * else get next filter of element & check it from filters was choosen
         */
        for (let j = 0; j < portfolioFiltersChosen.length; j++) {
          if(isInGroup) break;
          isInGroup = parseStrGroupsInArr.indexOf(portfolioFiltersChosen[j]) >= 0;
        }

        /**
         * selectedCategory, this categories from "industrial" section (Blockchain, fintech, etc.)
         */
        if(selectedCategory) {
          const elCategories = element.dataset.categories;
          const isInCategory = elCategories.includes(selectedCategory);

          return isInCategory && isInGroup;
        }
        
        return isInGroup;
      });

      $("#about-portfolio .portfolio-display-mobile-list").click();
    });
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
        let scrollTop;
        if(isMobile) {
          if(openedPortfolio.length > 0) {
            if(toTopScroll) scrollTop = projectTitle.offset().top - heightTitle - 30;
            else scrollTop = projectTitle.offset().top - 15;
          } else {
            scrollTop = projectTitle.offset().top - 15;
          }
        } else {
          scrollTop = gridOffset + inGridOffset - heightTitle - 2;
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

$(function() {
  shufflemePortfolio.init(function() {
    $("#about-portfolio .portfolio-display-mobile-list")
      .on("click", function() {
        $("#about-portfolio .portfolio-sorting").toggleClass("mobile-hidden");
        $("#about-portfolio .portfolio-display-mobile-element").toggleClass("selected");
      })
      .click();

    // init on the start "Show all projects"
    $("#filter-all").click();
  });
});
