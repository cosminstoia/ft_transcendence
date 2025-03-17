"use strict";
console.log("Script is working!");
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const playButton = document.getElementById('playButton');
const loginContainer = document.querySelector('.login__container');
const modeContainer = document.getElementById('modeContainer');
const singleplayerButton = document.getElementById('singleplayerButton');
const multiplayerButton = document.getElementById('multiplayerButton');
const ball = document.querySelector('.ball');
const paddleLeft = document.querySelector('.paddle__left');
const paddleRight = document.querySelector('.paddle__right');
const scoreDisplay = document.querySelector('.score');
let ballX = 400;
let ballY = 250;
let ballSpeedX = 4;
let ballSpeedY = 4;
let leftPaddleY = 0;
let rightPaddleY = 200;
const paddleSpeed = 10;
const paddleHeight = 80;
let leftScore = 0;
let rightScore = 0;
let isSinglePlayer = false;
function validateInputs() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    playButton.disabled = !(username && password);
}
usernameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);
playButton.addEventListener('click', chooseGame);
function chooseGame() {
    loginContainer.style.display = 'none';
    modeContainer.style.display = 'block';
}
singleplayerButton.addEventListener('click', () => {
    isSinglePlayer = true;
    startGame();
});
multiplayerButton.addEventListener('click', () => {
    isSinglePlayer = false;
    startGame();
});
function startGame() {
    modeContainer.style.display = 'none';
    setInterval(updateGame, 16); // Runs the game at 60 FPS
    window.addEventListener('keydown', movePaddles);
}
function updateGame() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY <= 0 || ballY >= 480) {
        ballSpeedY *= -1;
    }
    if (ballX <= 30 && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX *= -1;
    }
    if (ballX >= 780 && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX *= -1;
    }
    if (ballX <= 0) {
        rightScore++;
        resetBall();
    }
    if (ballX >= 800) {
        leftScore++;
        resetBall();
    }
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    scoreDisplay.textContent = `${leftScore}  ${rightScore}`;
    if (isSinglePlayer) {
        rightPaddleY = Math.max(Math.min(ballY - paddleHeight / 2, 400), 0);
    }
    paddleLeft.style.top = `${leftPaddleY}px`;
    paddleRight.style.top = `${rightPaddleY}px`;
}
function movePaddles(event) {
    switch (event.key) {
        case 'w':
            leftPaddleY = Math.max(leftPaddleY - paddleSpeed, 0);
            break;
        case 's':
            leftPaddleY = Math.min(leftPaddleY + paddleSpeed, 400);
            break;
        case 'ArrowUp':
            rightPaddleY = Math.max(rightPaddleY - paddleSpeed, 0);
            break;
        case 'ArrowDown':
            rightPaddleY = Math.min(rightPaddleY + paddleSpeed, 400);
            break;
    }
}
function resetBall() {
    ballX = 400;
    ballY = 250;
    ballSpeedX *= -1;
}
