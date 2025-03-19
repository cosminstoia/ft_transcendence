console.log("Script is working!");

const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const playButton = document.getElementById('playButton') as HTMLButtonElement;
const loginContainer = document.querySelector('.login__container') as HTMLElement;
const modeContainer = document.getElementById('modeContainer') as HTMLElement;
const singleplayerButton = document.getElementById('singleplayerButton') as HTMLButtonElement;
const multiplayerButton = document.getElementById('multiplayerButton') as HTMLButtonElement;
const ball = document.querySelector('.ball') as HTMLElement;
const paddleLeft = document.querySelector('.paddle__left') as HTMLElement;
const paddleRight = document.querySelector('.paddle__right') as HTMLElement;
const scoreDisplay = document.querySelector('.score') as HTMLElement;

// Starting Ball Position
let ballX = 400;
let ballY = 250;

let ballSpeedX = 4; // 4px/fram
let ballSpeedY = 4; // 4px/fram

// Starting Paddle Position
let leftPaddleY = 0; 
let rightPaddleY = 0;

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
}

const keyState: Record<string, boolean> = {};

window.addEventListener('keydown', (event: KeyboardEvent) => {
  keyState[event.key] = true;
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
  keyState[event.key] = false;
});

function updateGame() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;


  if (ballY <= 10 || ballY >= 480) {
    ballSpeedY *= -1;
  }

  if (ballX <= 30) {
    if (ballY + 10 >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
      ballSpeedX *= -1;
      ballX = 31; /* Adjust ball position to prevent tunneling */
    }
  }
  
  if (ballX >= 760) {
    if (ballY + 10 >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
      ballSpeedX *= -1;
      ballX = 759; /* Adjust ball position to prevent tunneling */
    }
  }

  if (ballX <= 0) {
    rightScore++;
    resetBall();
  }

  if (ballX >= 800) {
    leftScore++;
    resetBall();
  }

  if (keyState['w']) {
    leftPaddleY = Math.max(leftPaddleY - paddleSpeed, 0);
  }
  if (keyState['s']) {
    leftPaddleY = Math.min(leftPaddleY + paddleSpeed, 400);
  }
  if (keyState['ArrowUp']) {
    rightPaddleY = Math.max(rightPaddleY - paddleSpeed, 0);
  }
  if (keyState['ArrowDown']) {
    rightPaddleY = Math.min(rightPaddleY + paddleSpeed, 400);
  }

  // Update UI
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
  scoreDisplay.textContent = `${leftScore}  ${rightScore}`;

  if (isSinglePlayer) {
    rightPaddleY = Math.max(Math.min(ballY - paddleHeight / 2, 400), 0);
  }

  paddleLeft.style.top = `${leftPaddleY}px`;
  paddleRight.style.top = `${rightPaddleY}px`;
}

function resetBall() {
  ballX = 400;
  ballY = 250;
  ballSpeedX *= -1;
}