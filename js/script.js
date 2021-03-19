// gets the memory card selection

const gameCards = document.querySelectorAll('.memory-card');

let cardHasFlipped = false;
let lockBoard = false;
let firstCardFlip, secondCardFlip;
let counter = 0;
let levelMatches;
let url = window.location.href;
url = url.slice(-8);
var nextUrl;

/* targets the end of the URL to adjust the amount of matches before the game is over of moved on to the 
next level. 
**/

console.log("url is: ", url);
if (url.includes("1")) {
    levelMatches = 6;
    nextUrl = "level2.html";
}
if (url.includes("2")) {
    levelMatches = 10;
    nextUrl = "level3.html";
}
if (url.includes("3")) {
    levelMatches = 12;
    nextUrl = "winner.html";
}

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
        if (counter === levelMatches) {
            window.location = nextUrl;
        }
        disableCards();
    } else {
        console.log("notMatch: ", counter);
    }

}

function disableCards() {
    // this is disable cards
    firstCardFlip.removeEventListener('click', flipCard);
    secondCardFlip.removeEventListener('click', flipCard);
    resetGame();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCardFlip.classList.remove('flip');
        secondCardFlip.classList.remove('flip');
        resetGame();
    }, 1600);
}

// resets cards after each round thus avoiding double click crash

function resetGame() {
    [cardHasFlipped, lockBoard] = [false, false];
    [firstCardFlip, secondCardFlip] = [null, null];
}

/* assigns a number to cards to shuffle them at random. () before function 
executing this function as soon as it is declared
**/

(function shuffle() {
    gameCards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 12).toString();
    });
})();

gameCards.forEach(card => card.addEventListener('click', flipCard));

/* creates the read more/read less button in home.html 
**/

function myFunction() {

    let ellipsis = document.getElementById("ellipsis");

    let moreText = document.getElementById("continue");

    let btnText = document.getElementById("myBtn");

    if (ellipsis.style.display === "none") {
        ellipsis.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        ellipsis.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}