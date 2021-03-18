// targets cards in html
const gameCards = document.querySelectorAll('.memory-card');

let cardHasFlipped = false;
let lockBoard = false;
let firstCardFlip, secondCardFlip;
let counter = 0;

/* lock board prevents double card click removing event listener and crashing game
flips card when clicked
**/

function flipCard() {
    if (lockBoard) return;
    if (this === firstCardFlip) return;
    this.classList.add('flip');
    if (!cardHasFlipped) {
        cardHasFlipped = true;
        firstCardFlip = this;
        return;
    }
    secondCardFlip = this;

    checkForMatch();
}
// Uses datasets to match cards in html

function checkForMatch() {
    let isMatch = firstCardFlip.dataset.name === secondCardFlip.dataset.name;
    isMatch ? disableCards() : unflipCards();
    if (isMatch) {
        counter++;
        console.log("isMatch: ", counter);
        if (counter === 6) {
            console.log("yay, you've won!");
            window.location = "level2.html";
        }
        disableCards();
    } else {
        console.log("notMatch: ", counter);
    }
    // we need to find out here if all cards have been flipped or if no card is left for flipping
}

function myFunction() {
    let ellipsis = document.getElementById("ellipsis");
    let moreText = document.getElementById("continue");
    let textBtn = document.getElementById("myBtn");

    if (ellipsis.style.display === "none") {
        ellipsis.style.display = "inline";
        textBtn.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        ellipsis.style.display = "none";
        textBtn.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

function timer(time,update,complete) {
    let start = new Date().getTime();
    let interval = setInterval(function() {
        let now = time-(new Date().getTime()-start);
        if( now <= 0) {
            clearInterval(interval);
            complete();
        }
        else update(Math.floor(now/1000));
    },100); 
    // the smaller this number, the more accurate the timer will be
}

timer(
    11000, // milliseconds
    function(timeleft) { // called every step to update the visible countdown
        document.getElementById('timer').innerHTML = timeleft+" second(s)";
    },
    function() { // what to do after
        alert("Timer complete!");
    }
);


