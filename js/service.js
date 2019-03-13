
$(window).resize(function () {
    var lisFirst = document.getElementsByClassName("first-section");
    var lisSecond = document.getElementsByClassName("second-section");
    var lisHidden = document.getElementsByClassName("hidden-elements-section");
    var currentEementFirst = 2;
    var currentEementSecond = 2;

    if (document.body.clientWidth <= 720 && document.body.clientWidth > 480) {
        lisFirst[0].style.display = 'none';
        lisFirst[4].style.display = 'none';
        lisHidden[0].style.display = 'flex';
        lisHidden[1].style.display = 'flex';

        lisSecond[0].style.display = 'none';
        lisSecond[4].style.display = 'none';
        lisHidden[2].style.display = 'flex';
        lisHidden[3].style.display = 'flex';

    }

    if (document.body.clientWidth <= 480) {
        lisFirst[0].style.display = 'none';
        lisFirst[3].style.display = 'none';
        lisFirst[4].style.display = 'none';
        lisHidden[0].style.display = 'flex';
        lisHidden[1].style.display = 'flex';

        lisSecond[0].style.display = 'none';
        lisSecond[3].style.display = 'none';
        lisSecond[4].style.display = 'none';
        lisHidden[2].style.display = 'flex';
        lisHidden[3].style.display = 'flex';



    }

    if (document.body.clientWidth > 720) {
        lisHidden[0].style.display = 'none';
        lisHidden[1].style.display = 'none';
        lisHidden[2].style.display = 'none';
        lisHidden[3].style.display = 'none';

        lisFirst[0].style.display = 'block';
        lisFirst[3].style.display = 'block';
        lisFirst[4].style.display = 'block';
        lisSecond[0].style.display = 'block';
        lisSecond[3].style.display = 'block';
        lisSecond[4].style.display = 'block';
    }

    moveLeftFirstBlock = () => {

        if (document.body.clientWidth <= 720 && document.body.clientWidth > 480) {
            console.log("720*480 currentEementFirst "+currentEementFirst);

            if (currentEementFirst > 1) {
                $(".first-section").css({
                    "display": "none"
                });
                currentEementFirst -= 1;
                lisFirst[currentEementFirst].style.display = 'block';
                lisFirst[currentEementFirst + 1].style.display = 'block';
                lisFirst[currentEementFirst - 1].style.display = 'block';

            } else {

                return;
            }
        }

        if (document.body.clientWidth <= 480) {
            console.log("480 currentEementFirst "+currentEementFirst);

            if (currentEementFirst > 1) {
                $(".first-section").css({
                    "display": "none"
                });
                currentEementFirst -= 1;
                lisFirst[currentEementFirst].style.display = 'block';
                lisFirst[currentEementFirst - 1].style.display = 'block';

            } else {

                return;
            }

        }
    }


    moveRightFirstBlock = () => {

        if (document.body.clientWidth <= 720 && document.body.clientWidth > 480) {

            if (currentEementFirst < 3) {
                $(".first-section").css({
                    "display": "none"
                });
                currentEementFirst += 1;
                lisFirst[currentEementFirst].style.display = 'block';
                lisFirst[currentEementFirst + 1].style.display = 'block';
                lisFirst[currentEementFirst - 1].style.display = 'block';

            } else {

                return;
            }
        }

        if (document.body.clientWidth <= 480) {

            if (currentEementFirst < 3) {
                $(".first-section").css({
                    "display": "none"
                });

                currentEementFirst += 1;
                lisFirst[currentEementFirst].style.display = 'block';
                lisFirst[currentEementFirst + 1].style.display = 'block';

            } else {

                return;
            }


        }

    }

    moveLeftSecondBlock  = () =>  {

        if (document.body.clientWidth <= 720 && document.body.clientWidth > 480) {

            if (currentEementSecond > 1) {

                $(".second-section").css({
                    "display": "none"
                });

                currentEementSecond -= 1;
                lisSecond[currentEementSecond].style.display = 'block';
                lisSecond[currentEementSecond + 1].style.display = 'block';
                lisSecond[currentEementSecond - 1].style.display = 'block';

            } else {

                return;
            }
        }

        if (document.body.clientWidth <= 480) {

            if (currentEementSecond > 1) {

                $(".second-section").css({
                    "display": "none"
                });

                currentEementSecond -= 1;
                lisSecond[currentEementSecond].style.display = 'block';
                lisSecond[currentEementSecond - 1].style.display = 'block';
            } else {

                return;
            }

        }

    }

    moveRightSecondBlock  = () =>  {

        if (document.body.clientWidth <= 720 && document.body.clientWidth > 480) {

            if (currentEementSecond < 3) {

                $(".second-section").css({
                    "display": "none"
                });

                currentEementSecond += 1;
                lisSecond[currentEementSecond].style.display = 'block';
                lisSecond[currentEementSecond + 1].style.display = 'block';
                lisSecond[currentEementSecond - 1].style.display = 'block';
            } else {

                return;
            }
        }

        if (document.body.clientWidth <= 480) {

            if (currentEementSecond < 3) {

                $(".second-section").css({
                    "display": "none"
                });

                currentEementSecond += 1;
                lisSecond[currentEementSecond].style.display = 'block';
                lisSecond[currentEementSecond + 1].style.display = 'block';

            } else {

                return;
            }

        }

    }

});