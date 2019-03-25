var portfolioFiltersChosen = [];
var shufflemePortfolio = (function ($) {
    'use strict';
    let $grid = $('#grid-portfolio'), //locate what we want to sort
        $filterOptions = $('#about-portfolio .portfolio-sorting li'),  //locate the filter categories
        $sizer = $grid.find('.shuffle_sizer'),    //sizer stores the size of the items
        shuffler,
        init = function (onInit) {
            // None of these need to be executed synchronously
            setTimeout(function () {
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
        let setupPortfolioFilters = function () {
            let $btns = $filterOptions.children();
            $btns.on('click', function (e) {
                e.preventDefault();
                let $this = $(this),
                    group = $this.data('group');
                console.log("this element of active class " + $this);

                console.log("group " + group);

                if ($this.hasClass('active')) {
                    if (Array.isArray(group)) return;
                    // Hide current label, show current label in title
                    portfolioFiltersChosen = portfolioFiltersChosen.filter(function (value) {
                        return group !== value;
                    });
                    $this.removeClass('active');
                    if ($("#about-portfolio .portfolio-title a.active").length === 0) {
                        $("#filter-all").click();
                    }
                } else {
                    if (Array.isArray(group)) {
                        portfolioFiltersChosen = group;
                        $("#about-portfolio .portfolio-title a").removeClass('active');
                    } else {
                        if ($("#filter-all").hasClass("active")) {
                            $("#filter-all").removeClass("active");
                            portfolioFiltersChosen = [];
                        }
                        portfolioFiltersChosen.push(group);
                    }
                    $this.addClass('active');
                }

                //console.log("arrayss " + portfolioFiltersChosen);
                let portfolioFilterChosenConcat = portfolioFiltersChosen.join(", ");
                //console.log("portfolioFilterChosenConcat "+portfolioFilterChosenConcat);
                //console.log("portfolioFilterChosenConcat.length "+portfolioFilterChosenConcat.length);

                if (portfolioFilterChosenConcat.indexOf("all") >= 0) {
                    portfolioFilterChosenConcat = "All";
                } else {
                    if(portfolioFilterChosenConcat.length > 20) {
                        portfolioFilterChosenConcat = portfolioFilterChosenConcat.substr(0,20);
                    }
                }
                $("#about-portfolio .filter-elements").text(portfolioFilterChosenConcat);

                /*
                 // Hide current label, show current label in title
                 $('.portfolio-sorting li a').removeClass('active');

                 $this.addClass('active');
                */
                // Filter elements
                shuffler.filter((element, shuffle) => {
                    //console.log("elem: ", element);
                    for (let j = 0; j < portfolioFiltersChosen.length; j++) {
                        console.log('j: ' + j + "; f: " + portfolioFiltersChosen[j]);
                        if ($(element).data('groups').indexOf(portfolioFiltersChosen[j]) >= 0) return true;
                    }
                    return false;
                })

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
            });

            $btns = null;
        };


        let showPortfolioContent = function () {
            $(".projects").on('click', function (e) {
                console.log("e " + this);

                let id = this.id;
                console.log("id " + $("." + id).hasClass("hidden"));
                if ($("." + id).hasClass("hidden")) {
                    $("." + id).removeClass("hidden");
                    $(this).closest("li").css({"width": "100%"});
                } else {
                    $("." + id).addClass("hidden");
                    $(this).closest("li").css({"width": ""});
                }

                shuffler.update();

            });
        }

        // Re layout shuffle when images load. This is only needed
        // below 768 pixels because the .picture-item height is auto and therefore
        // the height of the picture-item is dependent on the image
        // I recommend using imagesloaded to determine when an image is loaded
        // but that doesn't support IE7
        // listenPortfolio = function () {
        //     let debouncedLayout = $.throttle(300, function () {
        //         shuffler.update();
        //     });
        //
        //     // Get all images inside shuffle
        //     $grid.find('img').each(function () {
        //         var proxyImage;
        //
        //         // Image already loaded
        //         if (this.complete && this.naturalWidth !== undefined) {
        //             return;
        //         }
        //
        //         // If none of the checks above matched, simulate loading on detached element.
        //         proxyImage = new Image();
        //         $(proxyImage).on('load', function () {
        //             $(this).off('load');
        //             debouncedLayout();
        //         });
        //
        //         proxyImage.src = this.src;
        //     });
        //
        //     // Because this method doesn't seem to be perfect.
        //     setTimeout(function () {
        //         debouncedLayout();
        //     }, 500);
        // };

    return {
        init: init
    };
}(jQuery));

/*
//Set up subheader
function displaySubHeader() {
    $(window).scroll(function () {
        if (($(window).scrollTop() + 20 >= $('#about-portfolio').offset().top) && ($(window).scrollTop() + 100 < $('#team').offset().top)) {
            $(".subheader-section").css({
                "display": "block"
            });
            $("#portfolio-a").css({
                "border-bottom": "17.2px solid",
                "padding-bottom": "2px"
            });
        } else {
            $(".subheader-section").css({
                "display": "none"
            });
            $("#portfolio-a").css({
                "border-bottom": "none",
                "padding-bottom": "10px 0"
            });
        }



    });
}
*/

//Set up subheader for portfolio section
function displaySubHeader() {
    $(window).scroll(function () {

        if (($(window).scrollTop() + 20 >= $('#about-portfolio').offset().top) && ($(window).scrollTop() + 100 < $('#team').offset().top)) {
            $(".subheader-section").css({
                "display": "block"
            });
        } else {
            $(".subheader-section").css({
                "display": "none"
            });
        }

        if (($(window).scrollTop() + 20 >= $('#about-portfolio').offset().top) && ($(window).scrollTop() + 100 < $('#about-hackathons').offset().top)) {
            $("#portfolio-a").addClass("selected-a");
            $("#portfolio-a-mobile").addClass("selected-a");
        } else {
            $("#portfolio-a").removeClass("selected-a");
            $("#portfolio-a-mobile").removeClass("selected-a");
        }

        if (($(window).scrollTop() + 20 >= $('#about-hackathons').offset().top) && ($(window).scrollTop() + 100 < $('#team').offset().top)) {
            $("#hackathon-a").addClass("selected-a");
            $("#hackathon-a-mobile").addClass("selected-a");
        } else {
            $("#hackathon-a").removeClass("selected-a");
            $("#hackathon-a-mobile").removeClass("selected-a");
        }
    });
}

$(document).ready(function () {
    displaySubHeader();

    $("#about-portfolio .portfolio-display-mobile-list").on('click', function() {
        $("#about-portfolio .portfolio-sorting").toggleClass("mobile-hidden");
        $("#about-portfolio .portfolio-display-mobile-element").toggleClass("selected");
    })

    shufflemePortfolio.init(function () {
        $("#filter-all").click();
    });
});