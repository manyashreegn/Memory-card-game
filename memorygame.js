let game = document.getElementById("game");
let time = document.getElementById("time");
let moves = document.getElementById("moves");
let message = document.getElementById("message");
let best = document.getElementById("best");

let form = document.getElementById("gameForm");
let restart = document.getElementById("restart");

let firstCard = null;
let secondCard = null;

let movesCount = 0;
let matched = 0;
let timeLeft = 60;
let timer;

let cards = [
    "A","A",
    "B","B",
    "c","c",
    "D","D"
];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;

    if (name == "") {
        message.innerText = "Please enter your name.";
        return;
    }

    startGame();
});

function startGame() {
    clearInterval(timer);

    firstCard = null;
    secondCard = null;
    movesCount = 0;
    matched = 0;
    timeLeft = 60;

    moves.innerText = "0";
    time.innerText = "60";
    message.innerText = "Game started!";

    shuffleCards();
    createCards();
    startTimer();

    showBestScore();
}

function shuffleCards() {
    cards.sort(function() {
        return Math.random() - 0.5;
    });
}

function createCards() {
    game.innerHTML = "";

    for (let i = 0; i < cards.length; i++) {

        let card = document.createElement("div");

        card.className = "card";
        card.innerText = "?";
        card.dataset.value = cards[i];

        card.addEventListener("click", function() {
            flipCard(card);
        });

        game.appendChild(card);
    }
}

function flipCard(card) {

    if (secondCard != null) {
        return;
    }

    if (card.classList.contains("show")) {
        return;
    }

    if (card.classList.contains("matched")) {
        return;
    }

    card.classList.add("show");
    card.innerText = card.dataset.value;

    if (firstCard == null) {

        firstCard = card;

    } else {

        secondCard = card;
        movesCount++;

        moves.innerText = movesCount;

        checkMatch();
    }
}

function checkMatch() {

    if (firstCard.dataset.value == secondCard.dataset.value) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matched++;

        firstCard = null;
        secondCard = null;

        if (matched == 4) {
            winGame();
        }

    } else {

        setTimeout(function() {

            firstCard.classList.remove("show");
            secondCard.classList.remove("show");

            firstCard.innerText = "?";
            secondCard.innerText = "?";

            firstCard = null;
            secondCard = null;

        }, 800);
    }
}

function startTimer() {

    timer = setInterval(function() {

        timeLeft--;

        time.innerText = timeLeft;

        if (timeLeft == 0) {

            clearInterval(timer);

            message.innerText = "Time is over! Try again.";

            disableCards();
        }

    }, 1000);
}

function winGame() {

    clearInterval(timer);

    let name = document.getElementById("name").value;

    message.innerText =
        "Congratulations " + name + "! You won!";

    saveBestScore();
}

function saveBestScore() {

    let oldScore = localStorage.getItem("bestScore");

    if (oldScore == null || movesCount < Number(oldScore)) {

        localStorage.setItem("bestScore", movesCount);

        best.innerText = movesCount;
    }
}

function showBestScore() {

    let oldScore = localStorage.getItem("bestScore");

    if (oldScore != null) {
        best.innerText = oldScore;
    } else {
        best.innerText = "-";
    }
}

function disableCards() {

    let allCards = document.querySelectorAll(".card");
}