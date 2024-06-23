const cards = document.querySelectorAll(".card");
const moves = document.querySelector(".increment__move");


let matched = 0; // Keeps track of the number of matched cards
let cardOne, cardTwo; // Stores the first and second clicked cards
let disableDeck = false; // Prevents the user from clicking on cards while the game is processing
let moveCounter = 0; // Keeps track of the number of moves made by the user
let totalMoves = 50; // Stores the maximum number of moves allowed for the current difficulty level

// Sets the number of total moves for the "easy" difficulty level
function setEasy() {
    totalMoves = 50;
    updateTotalMoves();
    moveCounter = 0;
    moves.textContent = moveCounter;
}

// Sets the number of total moves for the "hard" difficulty level  
function setHard() {
    totalMoves = 30;
    updateTotalMoves();
    moveCounter = 0;
    moves.textContent = moveCounter;
}

// Sets the number of total moves for the "legend" difficulty level
function setLegend() {
    totalMoves = 20;
    updateTotalMoves();
    moveCounter = 0;
    moves.textContent = moveCounter;
}

// Updates the display of the total moves allowed
function updateTotalMoves() {
    document.querySelector('.total_moves').textContent = totalMoves;
}

// Sets the difficulty level based on the user's selection
function setLevel(level) {
    level === 'easy' ? setEasy() :
    level === 'hard' ? setHard() :
    setLegend();
}

// Adds event listeners to the difficulty level buttons and toggles the "active_level" class
const elements = document.querySelectorAll(".level");
elements.forEach(element => {
  element.addEventListener("click", () => {
    elements.forEach(el => el.classList.remove("active_level"));
    element.classList.add("active_level");
  });
});

// Handles the flipping of a card and the matching logic
function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

// Checks if the two clicked cards match and updates the game state accordingly
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 800);
}

// Shuffles the cards and resets the game state
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
    moveCounter = 0;
    moves.textContent = moveCounter;
}

// Initializes the game by shuffling the cards
shuffleCard();

// Adds event listeners to each card to handle the flipping and move counting
cards.forEach(card => {
    card.addEventListener("click", () => {
        flipCard;
        moveCounter++;
        moves.textContent = moveCounter;
        if (moveCounter >= totalMoves) {
            moveCounter = 0;
            alert("Game Over! You've reached the maximum number of moves. Better luck next time!");
            shuffleCard();
        }
    });
});