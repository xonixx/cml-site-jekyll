/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top -100
        }, 1500, 'easeInOutExpo');
        event.preventDefault();

        // GA track clicks
        console.info('send', 'event', 'Link', 'click', $anchor.text());
        ga('send', 'event', 'Link', 'click', $anchor.text())
    });

    var introText = $('.intro-text');
    var padding = $(window).height() - introText.height();
    if (padding < 160)
        padding = 160;
    introText.css('padding-top', padding / 2 + 'px');
    introText.css('padding-bottom', padding / 2 + 'px');
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 150
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

Typed.new("#typed-animation", {
    strings: ["Full Stack^1500", "Mobile Development^1500", "Blockchain^1500", "IT Consulting^1500"]
    , typeSpeed: 50
    , startDelay: 100
    , loop: true
});

var particleColor = "#ffffff";
particlesJS("particles", {
    "particles": {
        "number": {
            "value": 120,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": particleColor
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": particleColor,
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 150,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

$(function () {
    let prevScrollPos = window.pageYOffset;
    $(window).on("scroll", function () {
        const currentScrollPos = window.pageYOffset;
        const navbar = $("nav.navbar");
        if($(window).width() < 768 && currentScrollPos > $( window ).height()) {
            if (prevScrollPos > currentScrollPos) {
                navbar.css("top", "0");
            } else {
                navbar.css("top", `-${navbar.height()}px`);
            }
        }
        prevScrollPos = currentScrollPos;
    })
})