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
}));

function displaySubHeader() {
  $(window).on("scroll", (function () {
    if (
      $(window).scrollTop() + 120 >= $("#about-portfolio").offset().top &&
      $(window).scrollTop() + 200 < $("#about-customers").offset().top
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
      $(window).scrollTop() + 200 >= $("#about-customers").offset().top &&
      $(window).scrollTop() + 200 < $("#about-hackathons").offset().top
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

    if (
      $(window).scrollTop() + 180 >= $("#about-hackathons").offset().top &&
      $(window).scrollTop() + 200 < $("#events").offset().top
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
  }));
}
