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
        values.playerNames()[0].value
      }</b> starter`,
      "",
      "info"
    );
    document.querySelector(
      ".currentPlayer"
    ).innerHTML = `Nuværende spiller: <br><b>${
      values.playerNames()[values.player].value
    }</b></b>`;
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
    values.players()[0].classList.remove("activePlayer");
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
/* const cursorRounded = document.querySelector(".rounded");
const cursorPointed = document.querySelector(".pointed");

const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.addEventListener("mousemove", moveCursor);
 */

console.log(values.checkBoxes());
console.log(values.checkBoxes().length);

//Hvis alle 3 er checked, udskriv værdi
//indel fields for sig med 3 bokse

function boxCheck(boxes, b, f) {
  if (boxes[b].checked && boxes[b + 1].checked && boxes[b + 2].checked) {
    /* values.checkField()[f].classList.add("scored"); */
  }
}

function fullRow() {
  for (i = 0; i < values.checkBoxes().length + 3; i += 3) {
    console.log(i);
    b = i;
    console.log(b);
    let boxes = document.querySelectorAll(".check input");
    boxCheck(boxes, b);
    /* if (boxes[b].checked && boxes[b + 1].checked && boxes[b + 2].checked) {
      f++;
      if(b > 3){
        values.checkField()[f].classList.add("scored");
      }
      console.log(`wuuh`);
    } */
  }
}

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
