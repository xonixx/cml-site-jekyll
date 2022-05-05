$((function () {
  const initSlider = elementId => $(elementId).slick({
    infinite: true,
    dots: true,
    draggable: true,
    prevArrow: '<img class="slider-arrow prev-arrow" src="/img/about/prev-arrow.svg" alt="Prev Arrow"/>',
    nextArrow: '<img class="slider-arrow next-arrow" src="/img/about/next-arrow.svg" alt="Next Arrow"/>',
  });

  initSlider('#our-industries');
  initSlider('#models-cooperation');
}));
