let board = document.getElementById("board");
let arr = [];
let recovery = [];
let players = ["x", "o"];
let player = "x";
let rows = Number(localStorage.getItem("sizevalue"));
let fix = String("repeat(" + rows + ",1fr)");
let myLength = 0;
let mySound = new sound("clickS.wav");
let clock = document.getElementById("stopwatch");
document.getElementById("name1").innerText = localStorage.getItem("textvalue1");
document.getElementById("name2").innerText = localStorage.getItem("textvalue2");
document.getElementById("board").style.gridTemplateColumns = fix;

let msec = 0;
let hr = 0;
let min = 0;
let sec = 0;
let timerState = false;
function timer() {
  if (timerState) {
    msec++;
    if (msec == 100) {
      sec++;
      msec = 0;
    }
    if (sec == 60) {
      min++;
      sec = 0;
    }
    if (min == 60) {
      hr++;
      min = 0;
      sec = 0;
    }
    if (sec < 10 && min < 10 && hr < 10) {
      clock.innerHTML = `0${hr}:0${min}:0${sec}:${msec}`;
    } else if (min < 10 && hr < 10) {
      clock.innerHTML = `0${hr}:0${min}:${sec}:${msec}`;
    } else if (hr < 10) {
      clock.innerHTML = `0${hr}:${min}:${sec}:${msec}`;
    } else {
      clock.innerHTML = `${hr}:${min}:${sec}:${msec}`;
    }
    setTimeout("timer()", 10);
  }
}

function stopTimer() {
  (hr = 0), (min = 0), (sec = 0), (msec = 0);
  clock.innerHTML = "00:00:00:0";
  timerState = false;
}

function startTimer() {
  (hr = 0), (min = 0), (sec = 0), (msec = 0);
  clock.innerHTML = "00:00:00:0";
  timerState = true;
  timer();
}

function startGame() {
  startTimer();
  for (i = 0; i < rows * rows; i++) {
    let elem = document.createElement("div");
    elem.className = "cell";
    board.appendChild(elem);
    elem.id = i;
    elem.onclick = click;
  }
}

function restartGame() {
  startTimer();
  for (i of recovery) {
    let cellToRemove = document.getElementById(i);
    cellToRemove.innerText = "";
    player = "x";
  }
  recovery = [];
  arr = [];
}

function backStep() {
  let step = recovery[recovery.length - 1];
  let cellToRemove = document.getElementById(step);
  cellToRemove.classList.remove("check");
  cellToRemove.innerText = "";
  player == "x" ? (player = "o") : (player = "x");
  arr.pop();
  recovery.pop();
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.play = function () {
    this.sound.play();
  };
}

function click(event) {
  mySound.play();
  let v = event.target;
  let id = event.target.id;
  arr[id] = player;
  recovery.push(id);
  v.innerText = player;
  let myLength = arr.join().length;
  if (myLength >= rows) {
    check();
  }
  v.classList.add("check");
  player == "x" ? (player = "o") : (player = "x");
}

let winTable2 = [];
function winTable() {
  for (i = 0; i < rows * 2 + 2; i += rows) {
    if (i < rows) {
      let horizon = [];
      for (n = 0; n < rows * rows; n++) {
        horizon.push(n);
      }
      while (horizon.length) {
        winTable2.push(horizon.splice(0, rows));
      }
    }
    if (i == rows) {
      for (n = 0; n < rows; n++) {
        let z = range2(n, rows);
        winTable2.push(z);
      }
    }
    if (i == rows * 2) {
      let diagonal1 = range3(0, rows);
      winTable2.push(diagonal1);
      let diagonal2 = range4(rows - 1, rows);
      winTable2.push(diagonal2);
    }
  }
}

winTable();
function check() {
  for (i of winTable2) {
    let temp = [];
    for (n in i) {
      temp.push(arr[i[n]]);
      if (temp.length == rows) {
        if (temp.every((element) => element == player)) {
          console.log(player + "  win");
        }
      }
    }
  }
}

function range2(start, rows) {
  return Array(rows)
    .fill()
    .map((_, idx) => start + idx * rows);
}

function range3(start, rows) {
  return Array(rows)
    .fill()
    .map((_, idx) => start + idx * (rows + 1));
}

function range4(start, rows) {
  return Array(rows)
    .fill()
    .map((_, idx) => start + idx * (rows - 1));
}
