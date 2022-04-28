$((function () {
  displaySubHeader();

  const isMobile = $(window).width() <= 1230;

  $('#customers-main').slick({
    infinite: true,
    dots: true,
    draggable: isMobile,
    prevArrow: !isMobile ?
      '<img class="slider-arrow prev-arrow" src="/img/about/prev-arrow.svg" alt="Prev Arrow"/>' : '',
    nextArrow: !isMobile ?
      '<img class="slider-arrow next-arrow" src="/img/about/next-arrow.svg" alt="Next Arrow"/>' : '',
  });

  const sliderArrow = $('.slider-arrow');
  sliderArrow.on("mouseenter", function() {
    $(this).addClass("pointer-cursor");
  });
  sliderArrow.on("mouseleave", function () {
    $(this).removeClass("pointer-cursor")
  });

  const subheaderA = $(".subheader-a");
  subheaderA.on("mouseenter", function () {
    $(this).addClass("selected-a")
    $(this).removeClass("non-selected-subheader")
  });
  subheaderA.on("mouseleave", function () {
    $(this).removeClass("selected-a");
    $(this).addClass("non-selected-subheader")
  })
}));

function displaySubHeader() {
  let inAboutSection = () =>
    $(window).scrollTop() + 101 >= $("#about-portfolio").offset().top &&
    $(window).scrollTop() + 160 < $("#events").offset().top;

  $(window).on("scroll", (function () {
    if (inAboutSection()) {
      setTimeout(function () {
        if (inAboutSection()) {
          $(".subheader-section").css({
            display: "block"
          });
        }
      }, 500);
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
        .trigger("blur");
      $("#portfolio-a-mobile")
        .removeClass("selected-a")
        .trigger("blur");
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
        .trigger("blur");
      $("#hackathon-a-mobile")
        .removeClass("selected-a")
        .trigger("blur");
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
        .trigger("blur");
      $("#customers-a-mobile")
        .removeClass("selected-a")
        .trigger("blur");
    }
  }));
}
