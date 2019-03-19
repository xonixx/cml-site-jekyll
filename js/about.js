var filtersChosen = [];
var shuffleme = (function ($) {
    'use strict';
    var $grid = $('#grid'), //locate what we want to sort
        $filterOptions = $('.portfolio-sorting li'),  //locate the filter categories
        $sizer = $grid.find('.shuffle_sizer'),    //sizer stores the size of the items
        shuffler,
        init = function (onInit) {
            // None of these need to be executed synchronously
            setTimeout(function () {
                listen();
                setupFilters();
                onInit();
            }, 100);

            // instantiate the plugin
            shuffler = new Shuffle($grid[0], {
                itemSelector: '[class*="col-"][data-groups]',
                sizer: $sizer[0]
            });
        },

        // Set up button clicks
        setupFilters = function () {
            var $btns = $filterOptions.children();
            $btns.on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    group = $this.data('group');


                console.log("group " + group);

                if ($this.hasClass('active')) {
                    // Hide current label, show current label in title
                    filtersChosen = filtersChosen.filter(function (value, index, arr) {
                        if (group === value)
                            return false;
                    });
                    $this.removeClass('active');
                } else {
                    $this.addClass('active');
                    if(Array.isArray(group)) {
                        filtersChosen = filtersChosen.concat(group);
                    } else {
                        filtersChosen.push(group);
                    }
                }

                console.log("arrayss " + filtersChosen);

                /*
                 // Hide current label, show current label in title
                 $('.portfolio-sorting li a').removeClass('active');

                 $this.addClass('active');
                */
                // Filter elements
                shuffler.filter((element, shuffle) => {
                    //console.log("elem: ", element);
                    for (let j = 0; j < filtersChosen.length; j++) {
                        console.log('j: ' + j + "; f: " + filtersChosen[j]);
                        if ($(element).data('groups').indexOf(filtersChosen[j]) >= 0) return true;
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
        },

        // Re layout shuffle when images load. This is only needed
        // below 768 pixels because the .picture-item height is auto and therefore
        // the height of the picture-item is dependent on the image
        // I recommend using imagesloaded to determine when an image is loaded
        // but that doesn't support IE7
        listen = function () {
            var debouncedLayout = $.throttle(300, function () {
                shuffler.update();
            });

            // Get all images inside shuffle
            $grid.find('img').each(function () {
                var proxyImage;

                // Image already loaded
                if (this.complete && this.naturalWidth !== undefined) {
                    return;
                }

                // If none of the checks above matched, simulate loading on detached element.
                proxyImage = new Image();
                $(proxyImage).on('load', function () {
                    $(this).off('load');
                    debouncedLayout();
                });

                proxyImage.src = this.src;
            });

            // Because this method doesn't seem to be perfect.
            setTimeout(function () {
                debouncedLayout();
            }, 500);
        };

    return {
        init: init
    };
}(jQuery));

//Set up subheader
function displaySubHeader() {
    $(window).scroll(function () {
        if (($(window).scrollTop() + 20 >= $('#about').offset().top) && ($(window).scrollTop() + 100 < $('#team').offset().top)) {
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

$(document).ready(function () {
    displaySubHeader();
    shuffleme.init(function () {
        $('a[data-group="eoshk"]').click();
    }); //filter portfolio
});