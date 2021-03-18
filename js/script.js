// targets cards in html
const gameCards = document.querySelectorAll('.memory-card');

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
    resetGame();
}
// delays the flip of the cards. Lockboard stops two cards being flipped at once 

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCardFlip.classList.remove('flip');
        secondCardFlip.classList.remove('flip');
        resetGame();
    }, 1500);
}
// resets variables after each round thus avoiding double click crash

function resetGame() {
  [cardHasFlipped, lockBoard] = [false, false];
  [firstCardFlip, secondCardFlip] = [null, null];
}

/* assigns a number to cards to shuffle them at random. () before function 
executing this function as soon as it is declared
**/

(function shuffle() {
  gameCards.forEach(card => {
    let selectRandom = Math.floor(Math.random() * 20);
    card.style.order = selectRandom;
  });
})();

gameCards.forEach(card => card.addEventListener('click', flipCard));

/* creates the read more/read less button in home.html 
**/

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

/*function timer(time,update,complete) {
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
);**/


function time()
{
    
  count=count+1;
  if (count >=6) //+1 than the req time as we have a delay of 1000ms
  {
     clearInterval(counts);
     /////////////what code should go here for the modal to pop up??///////////////////////
      $("#myModal").modal();
      
     return;
  }
    document.getElementById("times").innerHTML=count + " secs"; // watch for spelling
}
