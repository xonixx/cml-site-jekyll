

let teamImages = $(".team-photo-pictures").clone();
let currentIndexTeam = 0;
let stepTeam = 1;



    $(".left-button-team").on('click', function () {
            console.log("currentIndexFirst" + currentIndexTeam);
            console.log("step" + stepTeam);

            if (currentIndexTeam > 0) {
                currentIndexTeam -= 1;
                showElementsTeamBlock(currentIndexTeam, stepTeam);
            }

        }
    );

    $(".right-button-team").on('click', function () {
            console.log("currentIndexFirst" + currentIndexTeam);
            console.log("step" + step);

            if (currentIndexTeam + step < teamImages.length) {
                currentIndexTeam += 1;
                showElementsTeamBlock(currentIndexTeam, stepTeam);
            }

        }
    );

    function displayButtonsTeamBlock(currentIndexTeam, stepTeam) {
        console.log("step" + stepTeam);
        console.log("currentIndexTeam" + currentIndexTeam);
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
    console.log("teamImages.length  " + teamImages.length);
    createTeamPictures();
    if(document.body.clientWidth < 560) {
        currentIndexTeam = 0;
        console.log("team ready");
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
    console.log("we create pictures");
    teamImages.css({"display": "none"});
    teamImages.slice(indexElement, stepTeam + indexElement).css({"display": "block"});
    displayButtonsTeamBlock(indexElement, stepTeam);

}

function createTeamPictures() {
    console.log("we create pictures");
    for (let i = 0; i < teamImages.length; i++) {
        $(".team-photoes-list").append(teamImages[i]);
    }
}

$("#team-btn-click").on('click', function () {
        $("#contact")[0].scrollIntoView();
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
        console.log("team resize");
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



