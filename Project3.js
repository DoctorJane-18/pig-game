'use strict';

//Selecing Elements
const scoreEl0 = document.querySelector('#score-0');
const scoreEl1 = document.getElementById('score-1');
const currentEl0 = document.getElementById('current-0');
const currentEl1 = document.getElementById('current-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.newgame');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

//Start conditions
/*scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; // 0 = player number 0
let playing = true;*/
let scores, currentScore, activePlayer, playing;

const reset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // 0 = player number 0
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  diceEl.classList.add('hidden');
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
};

reset();

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active'); //ถ้ามีก็เอาออก ถ้าไม่มีก็เอาเข้า
  playerEl1.classList.toggle('player--active'); //ถ้ามีก็เอาออก ถ้าไม่มีก็เอาเข้า
};

//Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //console.log(dice);

    //3.Check foe roll 1
    if (dice !== 1) {
      //Add dice ti current score
      currentScore += dice; //currentScore = currentScore+dice
      document.getElementById(
        `current-${activePlayer}`
      ).textContent = currentScore;

      //currentEl0.textContent = currentScore;
    } else {
      //Switch to next player

      switchPlayer();
      /*document.getElementById(`current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerEl0.classList.toggle('player--active'); //ถ้ามีก็เอาออก ถ้าไม่มีก็เอาเข้า
    playerEl1.classList.toggle('player--active'); //ถ้ามีก็เอาออก ถ้าไม่มีก็เอาเข้า*/
      //ส่วนนี้ทำเป็นฟังก์ชั่นใหม่ เพราะซ้ำกับอันข้างล่าง เลยทำเป็นฟังก์ชั้น switchplayer
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    //scores[1] = scores[1] + currentScore;
    //2.check if player score >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.querySelector(`#score-${activePlayer}`).textContent = 'WINNER';

      document.querySelector('.dice').classList.add('hidden');
    } else {
      //Finish the game
      //Switch to the next player
      switchPlayer();
    }
  }
});

/*btnNew.addEventListener('click', function () {
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  activePlayer = 0;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [(0, 0)];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});*/
//เอาข้างบนไปสร้าง function ใหม่ แล้วเอามาใส่แต่ชื้อ function
//ฟังก์ชั่นใหม่ที่จะสร้าง จะสร้างตาม udemy อันข้างบนคือที่คิดเองเน้อ

btnNew.addEventListener('click', reset);
