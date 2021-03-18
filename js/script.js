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
//https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
// adding counter and timer
function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

//for when cards match
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

//for when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    },1100);
}

function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
}

function moveCounter(){
    moves++;
    counter.innerHTML = moves;

// setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// disableCards and event listener stops further flipping

function disableCards() {
    firstCardFlip.removeEventListener('click', flipCard);
    secondCardFlip.removeEventListener('click', flipCard);
    resetGame();
}
// delays the flip of the cards. Lockboard stops two cards being flipped at once 

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCardFlip.classList.remove('flip');
        secondCardFlip.classList.remove('flip');
        resetGame();
    }, 1200);
}
// resets cards after each round thus avoiding double click crash

function resetGame() {
    [cardHasFlipped, lockBoard] = [false, false];
    [firstCardFlip, secondCardFlip] = [null, null];
}
// counts moves
function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
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

//game timer
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first move
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }

    startGame(){
        let timer = document.querySelector(".timer");
        timer.innerHTML = "0 mins 0 secs";
        clearInterval(interval);
    }

startGame(){
     // shuffle deck
     cards = shuffle(cards);
     // remove all existing classes from each card
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match",            "disabled");
     }
     // reset moves
     moves = 0;
     counter.innerHTML = moves;
    // reset star rating
    for (let i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

//modal
let modal = document.getElementById("popup1")
//stars list
 let starsList = document.querySelectorAll(".stars li");
//close icon in modal
 let closeicon = document.querySelector(".close");
//congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
    //show congratulations modal
    modal.classList.add("show");
    //declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();
    };
}

//close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}
//for player to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
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


function time() {

    count = count + 1;
    if (count >= 6) //+1 than the req time as we have a delay of 1000ms
    {
        clearInterval(counts);
        /////////////what code should go here for the modal to pop up??///////////////////////
        $("#myModal").modal();

        return;
    }
    document.getElementById("times").innerHTML = count + " secs"; // watch for spelling
}
}