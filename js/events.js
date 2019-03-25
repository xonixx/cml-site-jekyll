
let firstSection = $(".event-slides");
let currentIndexFirst = 0;
var dotsArray;
let step = calculateStep(document.body.clientWidth);
showElementsFirstBlock(currentIndexFirst, step);


$(".event-left-button").on('click', function () {
    console.log("currentIndexFirst"+currentIndexFirst);
    console.log("step"+step);
        if (currentIndexFirst > 0) {
            if(document.body.clientWidth > 1200) {
                dotsArray.removeClass('dotactive');
                dotsArray[currentIndexFirst - 1].classList.add('dotactive');
            }
            currentIndexFirst -= 1;
            showElementsFirstBlock(currentIndexFirst, step);
        }
    }
);

$(".event-right-button").on('click', function () {
    console.log("currentIndexFirst"+currentIndexFirst);
    console.log("step"+step);
        if (currentIndexFirst + step < firstSection.length) {
            if(document.body.clientWidth > 1200) {
                dotsArray.removeClass('dotactive');
                dotsArray[currentIndexFirst + 1].classList.add('dotactive');
            }
            currentIndexFirst += 1;
            showElementsFirstBlock(currentIndexFirst, step);
        }
    }
);

$(".event-schedule").on('click', function () {
    $(".events-popup").css({"display": "block"});
    $(".pop-up-events").css({"display": "block"});
    }
);

$(".events-popup").on('click', function () {
    console.log("ghdrighrid");
    $(".events-popup").css({"display": "none"});
    $(".pop-up-events").css({"display": "none"});
    }
);


function showElementsFirstBlock(indexElement, step) {
    firstSection.css({"display": "none"});
    firstSection.slice(indexElement, step + indexElement).css({"display": "flex"});
    displayButtonsFirstBlock(indexElement, step);
}

function displayButtonsFirstBlock(currentIndexFirst, step) {

    if (currentIndexFirst === 0) {
        $(".event-left-button").css({
            "visibility": "hidden"
        });
    } else {
        $(".event-left-button").css({
            "visibility": "visible"
        });
    }

    if (currentIndexFirst + step === firstSection.length) {
        $(".event-right-button").css({
            "visibility": "hidden"
        });
    } else {
        $(".event-right-button").css({
            "visibility": "visible"
        });
    }
}

function calculateStep(width) {
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

function currentSlide(dotStep){
    dotsArray.removeClass('dotactive');
    console.log(dotStep);
    dotsArray[dotStep].classList.add('dotactive');
    currentIndexFirst = dotStep;
    showElementsFirstBlock(dotStep, step);
}

function createDots(){
    if(document.body.clientWidth > 1200) {
        console.log("we create dots");
        $(".event-dots").append("<span class='dot dotactive' onclick='currentSlide(" + 0 + ")'></span>");
        if (firstSection.length > 4) {
            console.log("yes more than 4", firstSection.length);
            for (let i = 1; i <= firstSection.length - 4; i++) {
                $(".event-dots").append("<span class='dot' onclick='currentSlide(" + i + ")'></span>");
            }
        }
        dotsArray = $(".dot");
    } else {
        $(".event-dots .dot").remove(); // innerHTML = "";
    }
}

$(document).ready(function () {
    createDots();
});

$(window).resize(function () {
    let newStep = calculateStep(document.body.clientWidth);

    if (newStep !== step) {
        createDots();
        currentIndexFirst = 0;
        step = newStep;
        showElementsFirstBlock(currentIndexFirst, step);
    }
});