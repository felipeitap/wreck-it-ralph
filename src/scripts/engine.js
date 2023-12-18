const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    life: document.querySelector("#life"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 30,
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000),
    timerId: setInterval(randomSquare, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime < 0) {
    gameOver();
  }
}

function gameOver() {
  let lifeValue = parseInt(state.view.life.innerHTML);
  console.log(lifeValue);

  if (lifeValue > 0) {
    const result = window.confirm("Game Over! Deseja continuar?");
    if (result) {
      lifeValue--;
      state.values.currentTime = 30;
      state.view.score.textContent = 0;
      state.values.result = 0;
      state.view.life.innerHTML = lifeValue;
    } else {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
    }
  } else {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Suas vidas acabaram!");
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  const randomNumber = Math.floor(Math.random() * 9);
  const randomSquare = state.view.squares[randomNumber];

  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playAudio();
      }
    });
  });
}

function playAudio() {
  const audio = new Audio("./src/audios/hit.m4a");
  audio.volume = 0.2;
  audio.play();
}

function init() {
  addListenerHitBox();
}

init();
