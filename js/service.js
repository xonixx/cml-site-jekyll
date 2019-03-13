$(function() {

    // use let, we don't need global variables now.

    let lisFirst = document.getElementsByClassName("first-section");
    let lisSecond = document.getElementsByClassName("second-section");
    let lisHidden = document.getElementsByClassName("hidden-elements-section");


    // going to display elements from currentElementFirst to currentElementFirst + showElementsNumber;
    // showElementsNumber is supposed to change on window resize to 2,3 or 5
    let currentElementFirst = 0;
    let currentElementSecond = 0;

    // check initial clientWidth and set showElementsNumber here :
    let showElementsNumber; // = ...


    // create callback functions on arrows clicked
    // you dont need to change these functions on window resize. Only showElementsNumber is changed;
    $(".left-button-first").on('click', function () {
        console.log('Left first clicked!');

        if (document.body.clientWidth <= 720 && document.body.clientWidth > 480) {
            console.log("720*480 currentEementFirst " + currentEementFirst);

            if (currentElementFirst > 0) {   // now we start counting from zero
                $(".first-section").css({
                    "display": "none"
                });

                currentElementFirst -= 1;

                // set display:flex on elements from [currentElementFirst] to
                // [currentElementFirst + showElementsNumber - 1] of lisFirst
                // look at .slice() jquery function and examples;

            } else {
                return;
            }
        }
    });


    //other callbacks ...


    $(window).resize(function () {

        // set showElementsNumberNew based on new clientWidth;

        // if showElementsNumberNew === showElementsNumber do nothing, leave all as is;

        console.log('Current element first is', currentElementFirst);
        console.log('Nothing to change');
        return;

        // else (i.e. if showElementsNumberNew !== showElementsNumber) set showElementsNumber = showElementsNumberNew
        currentElementFirst = 0;
        currentElementSecond = 0;
        // set display:flex on elements from [0] to [showElementsNumber-1] of lisFirst and lisSecond
        // display:none on elements from [showElementsNumber] to [4];


    });
});


//YOUR OLD CODE
$(window).resize(function () {

    return;   //doesn't work now, returns immediately

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