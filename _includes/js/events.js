let calendlyArray = new Map([
  ["event-1", "https://calendly.com/shchetynin/jeeconf?month-view=disabled"],
  ["event-2", "https://calendly.com/shchetynin/piratesummit?month-view=disabled"],
  ["event-3", "https://calendly.com/shchetynin/rise?month-view=disabled"],
  ["event-4", "https://calendly.com/shchetynin/websummit?month-view=disabled"],
  ["event-5", ""],
  ["event-6", ""]
]);

$(".event-schedule").on("click", function() {
  let id = this.id;
  console.log("id is " + id);
  let eventCalendly = calendlyArray.get(id);
  $(".events-popup").append(
    "<div class='pop-up-events'>" +
      "<div class='calendly-inline-widget hide-pop-up-events' data-url=' " +
      eventCalendly +
      "'></div>" +
      "<script type='text/javascript' src='https://assets.calendly.com/assets/external/widget.js'></script>" +
      "</div>"
  );
  $(".events-popup").css({ display: "block" });
  $(".pop-up-events").css({ display: "block" });
  $(".navbar-header .calendar-button").addClass("hidden");
  $(".back-button-header").removeClass("hidden");
});

$(".events-popup, .back-button-header").on("click", function() {
  $(".events-popup .pop-up-events").remove();
  $(".events-popup").css({ display: "none" });
  $(".pop-up-events").css({ display: "none" });
  $(".navbar-header .calendar-button").removeClass("hidden");
  $(".back-button-header").addClass("hidden");
});
$(window)
  .resize(function() {
    const width = $(window).width();
    const mobileScreen = 900;
    if (width <= mobileScreen) {
      $(".event-image-links").click(function(e) {
        e.preventDefault();
      });
    }
  })
  .resize();

$(document).ready(function() {
  $(".event-date").each(function () {
    const parsedDate = parseDate($( this ).text());
/*
    if(new Date(`${parsedDate.month} ${parsedDate.endDate} ${parsedDate.year}`) < new Date()) {
      $(this).parent().remove()
    }
*/
  })

  $('#event-slides-section').owlCarousel({
      items: calculateEventsOnPage(document.body.clientWidth),
      navigation: true,
      slideSpeed: 300,
      paginationSpeed: 400,
    }
  );
});

function parseDate(date) {
  const monthEndIndex = date.indexOf(" ");
  const yearStartIndex = date.lastIndexOf(" ");
  const startDate = date.substring(monthEndIndex + 1, date.indexOf("-"));
  const endDate = date.substring(date.indexOf("-") + 1, yearStartIndex);
  const month = date.substring(0, monthEndIndex);
  const year = date.substring(yearStartIndex + 1);
  return {startDate, endDate, month, year}
}

function calculateEventsOnPage(width) {
  if (width <= 600) {
    return 1;
  } else if (width <= 900 && width > 600) {
    return 2;
  } else if (width <= 1200 && width > 900) {
    return 3;
  } else {
    return 4;
  }
}
