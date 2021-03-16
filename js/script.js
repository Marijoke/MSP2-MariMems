// Flips cards when clicked, Matches cards and shuffles linked to CSS

const cards = document.querySelectorAll('.memory-card');

let cardHasFlipped = false;
let lockBoard = false;
let firstCardFlip, secondCardFlip;
let counter = 0;

/* lock board prevents double card click removing event listener and crashing game
flips card when clicked
**/

function flipCard(){
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
        counter ++;
        console.log("isMatch: ", counter);
        if (counter === 6) {
            console.log("yay, you've won!");
            window.location = "level2.html";
        }
        disableCards();
    } else {
        console.log("notMatch: ",counter);
    }
     // we need to find out here if all cards have been flipped or if no card is left for flipping
}
// disableCards and event listener stops further flipping

function disableCards() {
    firstCardFlip.removeEventListener('click', flipCard);
    secondCardFlip.removeEventListener('click', flipCard);
    resetBoard();
}
// delays the flip of the cards. Lockboard stops two cards being flipped at once 

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCardFlip.classList.remove('flip');
        secondCardFlip.classList.remove('flip');
        resetBoard();
    }, 1500);
}
// resets variables after each round thus avoiding double click crash

function resetBoard() {
  [cardHasFlipped, lockBoard] = [false, false];
  [firstCardFlip, secondCardFlip] = [null, null];
}

/* assigns a number to cards to shuffle them at random. () before function 
executing this function as soon as it is declared
**/

(function shuffle() {
  cards.forEach(card => {
    let selectRandom = Math.floor(Math.random() * 12);
    card.style.order = selectRandom;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

/* creates the read more button in home.html 
used https://www.w3schools.com/howto/howto_js_read_more.asp to create it.
**/

function myFunction() {
  let dots = document.getElementById("dots");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}