$(function() {

// use let, we don't need global variables now.

    let lisFirst = document.getElementsByClassName("first-section");
    let lisSecond = document.getElementsByClassName("second-section");
    let lisHidden = document.getElementsByClassName("hidden-elements-section");

// going to display elements from currentElementFirst to currentElementFirst + showElementsNumber;
// showElementsNumber is supposed to change on window resize to 2,3 or 5
//let currentElementFirst = 0;
//let currentElementSecond = 0;
    let currentIndexFirst = 0;
    let currentIndexSecond = 0;

// check initial clientWidth and set showElementsNumber here :
    let step = calculateStep(document.body.clientWidth);
    showElementsFirstBlock(currentIndexFirst,  step);
    showElementsSecondBlock(currentIndexSecond, step);

// create callback functions on arrows clicked
// you dont need to change these functions on window resize. Only showElementsNumber is changed;


    $(".left-button-first").on('click', function () {
            console.log('Left first clicked!');
            if (currentIndexFirst > 0 ) {
                currentIndexFirst -= 1;
                showElementsFirstBlock(currentIndexFirst, step); }
        }
    );

    $(".right-button-first").on('click', function () {
            console.log('Right first clicked!');
            if (currentIndexFirst + step < 5 ) {
                currentIndexFirst += 1;
                showElementsFirstBlock(currentIndexFirst, step);
            }
        }
    );

    $(".right-button-second").on('click', function () {
            console.log('Right first clicked!');
            if (currentIndexSecond + step < 5 ) {
                currentIndexSecond += 1;
                showElementsSecondBlock(currentIndexSecond, step);
            }
        }
    );

    $(".left-button-second").on('click', function () {
            console.log('Left first clicked!');
            if (currentIndexSecond > 0 ) {
                currentIndexSecond -= 1;
                showElementsSecondBlock(currentIndexSecond, step);
            }
        }
    );


//other callbacks ...

    function showElementsFirstBlock(indexElement, step){
        console.log("parameters are"+indexElement + " "+ step);
        $(".first-section").css({"display": "none"});
        $(".first-section").slice(indexElement, step+indexElement).css({"display": "list-item"});
        displayButtonsFirstBlock(indexElement, step);
    };

    function showElementsSecondBlock(indexElement, step){
        $(".second-section").css({"display": "none"});
        $(".second-section").slice(indexElement, step+indexElement).css({"display": "list-item"});
        displayButtonsSecondBlock(indexElement, step);
    };

    function displayButtonsFirstBlock(currentIndexFirst, step){

        if(currentIndexFirst === 0){
            $(".left-button-first").css({
                "display": "none"
            });
        }else {
            $(".left-button-first").css({
                "display": "flex"
            });
        }

        if(currentIndexFirst + step === 5){
            $(".right-button-first").css({
                "display": "none"
            });
        }else {
            $(".right-button-first").css({
                "display": "flex"
            });
        }

        if(step !== 5){
            $(".hidden-elements-section").css({
                "display": "flex"
            });
        }else {
            $(".hidden-elements-section").css({
                "display": "none"
            });
        }
    }

    function displayButtonsSecondBlock(currentIndexSecond, step){

        if(currentIndexSecond === 0){
            $(".left-button-second").css({
                "display": "none"
            });
        }else {
            $(".left-button-second").css({
                "display": "flex"
            });
        }

        if(currentIndexSecond + step === 5){
            $(".right-button-second").css({
                "display": "none"
            });
        }else {
            $(".right-button-second").css({
                "display": "flex"
            });
        }

        if(step !== 5){
            $(".hidden-elements-section").css({
                "display": "flex"
            });
        }else {
            $(".hidden-elements-section").css({
                "display": "none"
            });
        }
    }


    function calculateStep(width){
        if (width <= 480){
            return 2;
        } else if (width <= 720 && width > 480){
            return 3;
        } else {
            return 5;
        }
    }


    $(window).resize(function () {
        let newStep = calculateStep(document.body.clientWidth);

        if (newStep !== step) {
            currentIndexFirst = 0;
            currentIndexSecond = 0;
            step = newStep;
            showElementsFirstBlock(currentIndexFirst, step);
            showElementsSecondBlock(currentIndexSecond, step);
        }
    });
});

