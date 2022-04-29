

let teamImages = $(".team-photo-pictures").clone();
let currentIndexTeam = 0;
let stepTeam = 1;



    $(".left-button-team").on('click', function () {
            if (currentIndexTeam > 0) {
                currentIndexTeam -= 1;
                showElementsTeamBlock(currentIndexTeam, stepTeam);
            }

        }
    );

    $(".right-button-team").on('click', function () {
            if (currentIndexTeam + stepTeam < teamImages.length) {
                currentIndexTeam += 1;
                showElementsTeamBlock(currentIndexTeam, stepTeam);
            }

        }
    );

    function displayButtonsTeamBlock(currentIndexTeam, stepTeam) {
        if (currentIndexTeam === 0) {
            $(".left-button-team").css({
                "visibility": "hidden"
            });
        } else {
            if(document.body.clientWidth < 560) {
                $(".left-button-team").css({
                    "visibility": "visible"
                });
            }
        }

        if (currentIndexTeam + stepTeam === teamImages.length) {
            $(".right-button-team").css({
                "visibility": "hidden"
            });
        } else {
            if(document.body.clientWidth < 560) {
                $(".right-button-team").css({
                    "visibility": "visible"
                });
            }
        }
    }

$(function () {
    createTeamPictures();
    if(document.body.clientWidth < 560) {
        currentIndexTeam = 0;
        showElementsTeamBlock(currentIndexTeam, stepTeam);
        $(".team-photoes-list").css({
            "display": "block"
        });
        $(".team-photoes").css({
            "display": "none"
        });
    } else {

        $(".team-photoes-list").css({
            "display": "none"
        });

        $(".team-photoes").css({
            "display": "block"
        });
    }
});

function showElementsTeamBlock(indexElement, stepTeam) {
    teamImages.css({"display": "none"});
    teamImages.slice(indexElement, stepTeam + indexElement).css({"display": "block"});
    displayButtonsTeamBlock(indexElement, stepTeam);

}

function createTeamPictures() {
    for (let i = 0; i < teamImages.length; i++) {
        $(".team-photoes-list").append(teamImages[i]);
    }
}

$("#team-btn-click").on('click', function () {
        const heightHeader = $("nav").height();
        const isMobile = $(window).width() < 768
          ? 0
          : heightHeader;

        $("html, body").animate({
            scrollTop: $('#contact').offset().top - isMobile
        }, 1500, 'easeInOutExpo');

        $("#message").val("Applying for FullStack Position");
    }
);


$(window).resize(function () {

    if (document.body.clientWidth < 560) {
        $(".team-photoes-list").css({
            "display": "block"
        });
        $(".team-photoes").css({
            "display": "none"
        });

        currentIndexTeam = 0;
        showElementsTeamBlock(currentIndexTeam, stepTeam);
    } else{
        $(".left-button-team").css({
            "visibility": "hidden"
        });
        $(".team-photoes-list").css({
            "display": "none"
        });

        $(".team-photoes").css({
            "display": "block"
        });
        $(".right-button-team").css({
            "visibility": "hidden"
        });
    }
});



