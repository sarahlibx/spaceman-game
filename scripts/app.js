/* ----- CONSTANTS ----- */
const listOfWords = ['']
const maxGuesses = 6;

/* ----- VARIABLES/STATE ----- */

let currentWord = "";
let correctLetters;
let wrongGuessCount;

/* ----- CACHED ELEMENTS ----- */

const wordDisplayEl = document.querySelector('.word-display');
const guessesTextEl = document.querySelector('.guesses-text b');
const keyboardDivEl = document.querySelector('.keyboard');
const remainingGuessesEl = document.querySelector('.guesses-text');
const gameModalEl = document.querySelector('.game-modal');
const playAgainBtnEl = document.querySelector('.play-again');
const catLaunchEl = document.querySelector('.space-cat');

/* ----- FUNCTIONS ----- */

// reset game board to empty board with zero guesses
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    guessesTextEl.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    // create empty letter slots
    wordDisplayEl.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    // enable keyboard buttons
    keyboardDivEl.querySelectorAll('button').forEach(btn => btn.disabled = false);
    // hide the game modal
    gameModalEl.classList.remove('show');
}

// get random word and set up game
const getRandomWord = () => {
    // picking a random word & hint from wordlist.js file
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    // set current word & update the hint
    currentWord = word;
    document.querySelector('.hint-text b').innerText = hint;
    // call reset game funciton
    resetGame();
}

// handles end of game status display
const gameOver = (isWin) => {
    // show the game over modal with game status details
    const modalText = isWin ? `You found the word:` : 'The correct word was:';
    gameModalEl.querySelector('img').src = `assets/${isWin ? 'win' : 'lost'}.gif`;
    gameModalEl.querySelector('h4').innerText = isWin ? 'Congrats! Nyan is on the way to space' : 'Game Over, Nyan is researching new ways to become a spacecat.';
    gameModalEl.querySelector('p').innerHTML = `${modalText} <b>${currentWord}<b>`;
    gameModalEl.classList.add('show');
}

// keyboard buttons via for loop
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDivEl.appendChild(button);
    // event listener for each button
    button.addEventListener('click', (e) => initGame(e.target, String.fromCharCode(i)));
}

// handle game logic when letter is clicked
const initGame = (button, clickedLetter) => {
    // checking if clicken letter is in the currentWord
    if(currentWord.includes(clickedLetter)) {
        // update the displayed letters if clicked is correct
        [...currentWord].forEach((letter, index) => {
           if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplayEl.querySelectorAll('li')[index].innerText = letter;
                wordDisplayEl.querySelectorAll('li')[index].classList.add('guessed');
           } 
        });
    } else {
        // update wrong guess count if letter guessed is incorrect
        wrongGuessCount++;
    }
    // disable the clicked button when guessed
    button.disabled = true;
    // update the displayed guess count
    guessesTextEl.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // check if game should end based on win or lose conditions
    if (wrongGuessCount === maxGuesses)    
        return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

// starting the game with a random word
getRandomWord();

/* ----- EVENT LISTENERS ----- */
// event listener for play again button
playAgainBtnEl.addEventListener('click', getRandomWord);