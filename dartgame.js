//Global variables
//Display
const style = (ele, display) => {
  document.querySelector(ele).style.display = display;
};
const startBut = document.querySelector(".start");
const reBut = document.querySelector(".restart");
const addBut = document.querySelector(".add");
const remBut = document.querySelector(".remove");
const nextBut = document.querySelector(".next");
const prevBut = document.querySelector(".prev");
const infoBut = document.querySelector(".info");

// Game Index & Values
const values = {
  round: 1,
  player: 0,
  players: function () {
    return document.querySelectorAll(".player");
  },
  playerNames: function () {
    return document.querySelectorAll(".playerName");
  },
  checkField: function () {
    return document.querySelectorAll(".check");
  },
  checkBoxes: function () {
    return document.querySelectorAll(".check input");
  },
};
// Hold eller single player selection
//Player creation
const player = {
  name: "",
  //Creating checkboxes
  callBoxes: function () {
    for (i = 0; i < 11; i++) {
      const checkBoxes = document.createElement("span");
      checkBoxes.className = "check";
      values.players()[-1 + values.players().length].appendChild(checkBoxes);
      checkBoxes.innerHTML = `<input type="checkbox"><input type="checkbox"/><input type="checkbox"/>`;
    }
  },
  //Collecting Player Info
  callPlayer: function () {
    const addPlayer = document.createElement("div");
    addPlayer.className = "player";
    document.querySelector(".dart-body").appendChild(addPlayer);
    addPlayer.innerHTML = `<span class="empty"><input class='playerName' value='${player.name}'/>
    </span>
    `;
    player.callBoxes();
  },
};
//Sidepanel information
document.querySelector(
  ".currentPlayer"
).innerHTML = `Nuværende spiller: <br><b>0</b></b>`;
document.querySelector(
  ".round"
).innerHTML = `Runde: <br><b>${values.round}</b>`;

// Add Player
addBut.addEventListener("click", () => {
  (async () => {
    const { value: text } = await Swal.fire({
      title: "Skriv holdets navn",
      input: "text",
      inputLabel: "Afslut med Enter",
      inputPlaceholder: "Skriv holdets navn",
    });
    if (text) {
      player.name = text;
      player.callPlayer();
      playerExist();
      return;
    }
    Swal.fire(`En spiller kr;ver et navn`, "", "info");
  })();
});

// Remove Player
remBut.addEventListener("click", () => {
  let i = values.players().length;
  let name = values.playerNames();
  if (i >= 1) {
    Swal.fire({
      title: `Vil du slette spiller 
      <b>${name[-1 + i].value}</b> og progression?`,
      showDenyButton: true,
      confirmButtonText: "Slet",
      denyButtonText: `Slet ikke`,
    }).then((result) => {
      if (result.isConfirmed) {
        values.players()[-1 + i].remove();
        playerExist();
        return;
      }
      Swal.fire(`<b>${name[-1 + i].value}</b> blev ikke slettet`, "", "info");
    });
  }
});

//Næste Spiller
let p = 0;
nextBut.addEventListener("click", () => {
  p++;
  values.players()[p - 1].classList.remove("activePlayer");
  if (p === values.players().length) {
    values.player = -1;
    p = 0;
    values.round++;
    document.querySelector(
      ".round"
    ).innerHTML = `Runde: <br><b>${values.round}</b>`;
  }
  values.player++;
  document.querySelector(
    ".currentPlayer"
  ).innerHTML = `Nuværende spiller: <br><b>${
    values.playerNames()[values.player].value
  }</b></b>`;
  Swal.fire({
    position: "middle",
    icon: "success",
    title: `${values.playerNames()[values.player].value}'s tur`,
    showConfirmButton: false,
    timer: 1000,
  });
  values.players()[p].classList.add("activePlayer");
});
//Forrige Spiller
prevBut.addEventListener("click", () => {
  if (p === 0) {
    p = 0;
    return;
  }
  p--;
  values.player--;
  document.querySelector(
    ".currentPlayer"
  ).innerHTML = `Nuværende spiller: <br><b>${
    values.playerNames()[values.player].value
  }</b></b>`;
  Swal.fire({
    position: "middle",
    icon: "success",
    title: `${values.playerNames()[values.player].value}'s tur`,
    showConfirmButton: false,
    timer: 1000,
  });
  values.players()[p].classList.add("activePlayer");
  values.players()[p + 1].classList.remove("activePlayer");
});

// Hvis Spiller findes, lav Startknappen
function playerExist() {
  if (values.players().length > 0) {
    style(".start", "block");
    return;
  }
  style(".start", "none");
}
// Start DartGame
let startGame = false;
let gameGoing = 0;
startBut.addEventListener("click", () => {
  if (!startGame) {
    Swal.fire(
      `Spillet er startet, <br> <b>${
        values.playerNames()[p].value
      }</b> starter`,
      "",
      "info"
    );
    document.querySelector(
      ".currentPlayer"
    ).innerHTML = `Nuværende spiller: <br><b>${
      values.playerNames()[values.player].value
    }</b></b>`;
    checkClick();
    style(".add", "none");
    style(".remove", "none");
    style(".next", "block");
    style(".prev", "block");
    startBut.innerHTML = "Pause";
    if (gameGoing === 0) {
      values.players()[0].classList.add("activePlayer");
    }
  } else {
    Swal.fire(`Spillet er pauset`, "", "info");
    style(".add", "block");
    style(".remove", "block");
    style(".next", "none");
    style(".prev", "none");
    gameGoing++;
    startBut.innerHTML = "Forsæt spil";
  }
  startGame = !startGame;
  console.log(startGame);
});

//Genstart Spillet
document.querySelector(".restart").addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Vil du genstarte spillet?",
      text: "Spillets progression vil blive nulstillet!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ja, nyt spil!",
      cancelButtonText: "Nej, forsæt spil!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Genstarter",
          "Et nyt spil starter",
          "success"
        );
        timer = setTimeout(() => {
          location.reload();
        }, 1000);
        return;
      }
      {
        swalWithBootstrapButtons.fire(
          "Annuleret",
          "Tidligere spil forsætter",
          "error"
        );
      }
    });
});

// Dart mus
const cursorRounded = document.querySelector(".rounded");
const cursorPointed = document.querySelector(".pointed");

const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.addEventListener("mousemove", moveCursor);

//Fuld Række Function
let f = -2;
function boxCheck(boxes, b, f, r) {
  if (boxes[b].checked && boxes[b + 1].checked && boxes[b + 2].checked) {
    values.checkField()[r].classList.add("scored");
  } else {
    values.checkField()[r].classList.remove("scored");
  }
}
//Fuld Række For loop
function fullRow() {
  for (i = 0; i < values.checkBoxes().length + 3; i += 3) {
    b = i;
    f++;
    f++;
    r = b - f;
    let boxes = document.querySelectorAll(".check input");
    boxCheck(boxes, b, f, r);
  }
}
//Reset f, så Fuld Række kan indlæses igen.
function checkClick() {
  for (i = 0; i < values.checkBoxes().length; i++)
    values.checkBoxes()[i].addEventListener("click", function res() {
      f = -2;
      fullRow();
    });
}

//Fuld Spiller plade Func
//Fortælling om hvor mange runder etc. person brugte.
function fullPlate(boxes, v, g, player) {
  for (i = g; i < v; i++) {}
  if (boxes[i].checked) {
    Swal.fire(
      `<img src='img/trophy.gif'><p class='winRespond'><b>Tillykke</b><b> ${
        values.playerNames()[player].value
      }!</b><br><br> Du blev færdig på <br><br> ${values.round} Runder</p>`,
      "",
      ""
    );
    celebrate();
    setTimeout(() => {
      celebrate();
    }, "1000");
    setTimeout(() => {
      celebrate();
    }, "2000");
  }
}
//Fuld Spiller plader
//Spiler 1
function fullPlateOne() {
  let boxes = document.querySelectorAll(".check input");
  v = 32;
  g = 0;
  let player = 0;
  fullPlate(boxes, v, g, player);
}
//Spiller 2
function fullPlateTwo() {
  let boxes = document.querySelectorAll(".check input");
  v = 65;
  g = 32;
  let player = 1;
  fullPlate(boxes, v, g, player);
}
//Spiller 3
function fullPlateThree() {
  let boxes = document.querySelectorAll(".check input");
  v = 98;
  g = 65;
  let player = 2;
  fullPlate(boxes, v, g, player);
}
//Spiller 4
function fullPlateFour() {
  let boxes = document.querySelectorAll(".check input");
  v = 131;
  g = 98;
  let player = 3;
  fullPlate(boxes, v, g, player);
}

// Confetti Celebration
function celebrate() {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();

  //Confetti
  //Colors
  jsConfetti.addConfetti({
    emojis: ["🎯", "🎯", "🎯", "🎯", "🎯", "🎯"],
    emojiSize: 100,
    confettiNumber: 20,
  });
}

//Spil Information boks
//Åbne
infoBut.addEventListener("click", () => {
  console.log("hej");
  document.querySelector(".information").classList.add("ani");
  document.querySelector(".information").classList.remove("aniOut");
});
//Lukke
document.querySelector(".shortExit").addEventListener("click", () => {
  document.querySelector(".information").classList.remove("ani");
  document.querySelector(".information").classList.add("aniOut");
});

function ga() {
  let saveRounds = (document.cookie = values.round);
  localStorage.setItem(saveRounds);
  JSON.stringify(values.round);
}
let storage = localStorage.getItem("hobby");

console.log(storage);
