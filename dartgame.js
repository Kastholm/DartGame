/* -------------------------------------------------------------------------- */
/*                              Global variables                              */
/* -------------------------------------------------------------------------- */
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
const logBut = document.querySelector(".log");
const saveBut = document.querySelector(".saveBtn");
const backBut = document.querySelector(".backBut");

/* -------------------------------------------------------------------------- */
/*                             Game Index & Values                            */
/* -------------------------------------------------------------------------- */
const values = {
  round: 1,
  player: 0,
  game: 1,
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
/* -------------------------------------------------------------------------- */
/*                               Player creation                              */
/* -------------------------------------------------------------------------- */
const player = {
  name: "",
  /* -------------------------------------------------------------------------- */
  /*                             Creating checkboxes                            */
  /* -------------------------------------------------------------------------- */
  callBoxes: function () {
    for (i = 0; i < 11; i++) {
      const checkBoxes = document.createElement("span");
      checkBoxes.className = "check";
      values.players()[-1 + values.players().length].appendChild(checkBoxes);
      checkBoxes.innerHTML = `<input type="checkbox"><input type="checkbox"/><input type="checkbox"/>`;
    }
  },
  /* -------------------------------------------------------------------------- */
  /*                           Collecting Player Info                           */
  /* -------------------------------------------------------------------------- */
  callPlayer: function () {
    const addPlayer = document.createElement("div");
    addPlayer.className = "player";
    document.querySelector(".dart-body").appendChild(addPlayer);
    addPlayer.innerHTML = `<span class="empty"><input class='playerName' value='${player.name.toUpperCase()}'/>
    </span>
    `;
    player.callBoxes();
  },
};
/* -------------------------------------------------------------------------- */
/*                            Sidepanel information                           */
/* -------------------------------------------------------------------------- */
document.querySelector(
  ".currentPlayer"
).innerHTML = `Nuværende spiller: <br><b>0</b></b>`;
document.querySelector(
  ".round"
).innerHTML = `Runde: <br><b>${values.round}</b>`;

/* -------------------------------------------------------------------------- */
/*                                 Add Player                                 */
/* -------------------------------------------------------------------------- */
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
    Swal.fire(`En spiller kræver et navn`, "", "info");
  })();
});

/* -------------------------------------------------------------------------- */
/*                                Remove Player                               */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                                Næste Spiller                               */
/* -------------------------------------------------------------------------- */
let p = 0;
nextBut.addEventListener("click", () => {
  next();
});
function next() {
  /* if(values.players()[p].classList.contains('winPlayer')){
    p+2;
  } */
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
}
/* -------------------------------------------------------------------------- */
/*                               Forrige Spiller                              */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                    Hvis Spiller findes, lav Startknappen                   */
/* -------------------------------------------------------------------------- */
function playerExist() {
  if (values.players().length > 0) {
    style(".start", "block");
    return;
  }
  style(".start", "none");
}
/* -------------------------------------------------------------------------- */
/*                               Start DartGame                               */
/* -------------------------------------------------------------------------- */
let startGame = false;
let gameGoing = 0;
let startCheck = 0;

startBut.addEventListener("click", () => {
  startDart();
});
function startDart() {
  if (!startGame) {
    startCheck++;
    playerCount();
    Swal.fire(
      `Spillet er startet, <br> <b>${
        values.playerNames()[p].value
      }</b> starter`,
      "",
      "info"
    );
    //Finder navn på spiller
    document.querySelector(
      ".currentPlayer"
    ).innerHTML = `Nuværende spiller: <br><b>${
      values.playerNames()[values.player].value
    }</b></b>`;
    //Reset f
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
    startCheck = 0;
    style(".add", "block");
    style(".remove", "block");
    style(".next", "none");
    style(".prev", "none");
    gameGoing++;
    startBut.innerHTML = "Forsæt spil";
  }
  startGame = !startGame;
}
/* -------------------------------------------------------------------------- */
/*    Hvis spiller ikke har startet spillet for han pr'ver at s;tte point.    */
/* -------------------------------------------------------------------------- */
document.querySelector(".dart-body").addEventListener("click", () => {
  for (i = 0; i < values.checkBoxes().length; i++) {
    if (startCheck === 0) {
      Swal.fire({
        title: `Spillet er ikke startet <br> - <b>Vil du starte spillet?</b>`,
        showDenyButton: true,
        confirmButtonText: "Ja",
        denyButtonText: `Nej`,
      }).then((result) => {
        if (result.isConfirmed) {
          startDart();
          return;
        }
      });
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                              Genstart Spillet                              */
/* -------------------------------------------------------------------------- */
document.querySelector(".restart").addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  swalWithBootstrapButtons
    .fire({
      title: `<h2 style='color: red '>VIGTIGT!</h2> <br><h5>Nyt spil med samme spillere, <br><b>klik Nyt Spil</b></br></h5><br><h5>Genstart spil og slet historik, <br><b style='color: red ' >klik Slet Spil</b></br></h5>`,
      text: ``,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Nyt Spil",
      cancelButtonText: "Slet Spil",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        function regen() {
          // gets the JSON from the storage
          let historyJSON2 = localStorage.getItem("history");
          if (historyJSON2) {
            // if exsists makes into an array
            let historyArray2 = JSON.parse(historyJSON2);
            console.log(historyArray2);
            for (let i in historyArray2) {
              // write out the historic players
              console.log(historyArray2[i].playername);
              const addPlayer = document.createElement("div");
              addPlayer.className = "player";
              document.querySelector(".dart-body").appendChild(addPlayer);
              addPlayer.innerHTML = `<span class="empty"><input class='playerName' value='${historyArray2[i].playername}'/>
        </span>
        `;
              player.callBoxes();
            }
          }
        }

        values.players().forEach((player) => {
          player.remove();
        });

        /* let pl = values.players().length;
        for(l = 0 ; l < pl; l++){
          l = 0;
          values.players()[l].remove()
        } */
        style(".add", "block");
        style(".remove", "block");
        style(".next", "none");
        style(".prev", "none");

        values.round = 1;
        document.querySelector(
          ".round"
        ).innerHTML = `Runde: <br><b>${values.round}</b>`;
        startGame = false;
        gameGoing = 0;
        startCheck = 0;
        startBut.innerHTML = "Start Spil";

        regen();
        values.game++;
        Swal.fire({
          title: `<b>Genstartet</b>
            Klik start når du er klar til at starte <br><b>spil nr. ${values.game}`,
          icon: "success",
          confirmButtonText: "Start nyt Spil",
        }).then((result) => {
          if (result.isConfirmed) {
            playerExist();

            return;
          }
          Swal.fire(`blev ikke slettet`, "", "info");
        });

        return;
      }
      {
        swalWithBootstrapButtons.fire(
          "Genstartet",
          "Tidligere spil slettet",
          "error"
        );
        localStorage.clear();
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
});

/* -------------------------------------------------------------------------- */
/*                                  Dart mus                                  */
/* -------------------------------------------------------------------------- */
const cursorRounded = document.querySelector(".rounded");
const cursorPointed = document.querySelector(".pointed");

const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.addEventListener("mousemove", moveCursor);

/* -------------------------------------------------------------------------- */
/*                             Fuld Række Function                            */
/* -------------------------------------------------------------------------- */
let f = -2;
function boxCheck(boxes, b, f, r) {
  if (boxes[b].checked && boxes[b + 1].checked && boxes[b + 2].checked) {
    values.checkField()[r].classList.add("scored");
  } else {
    values.checkField()[r].classList.remove("scored");
  }
}
/* -------------------------------------------------------------------------- */
/*                             Fuld Række For loop                            */
/* -------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------- */
/*                  Reset f, så Fuld Række kan indlæses igen.                 */
/* -------------------------------------------------------------------------- */
function checkClick() {
  for (i = 0; i < values.checkBoxes().length; i++)
    values.checkBoxes()[i].addEventListener("click", function res() {
      f = -2;
      fullRow();
    });
}

//Fuld Spiller plade Func
//Fortælling om hvor mange runder etc. person brugte.
/* function fullPlate(boxes, v, g, player) {
  for (i = g; i < v; i++) {
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
}
 */
let place = 1;
let score = 0;
function fullPlate(boxes, v, g, player) {
  for (i = g; i < v; i++)
    if (
      boxes[i].checked &&
      boxes[i + 1].checked &&
      boxes[i + 2].checked &&
      boxes[i + 3].checked &&
      boxes[i + 4].checked &&
      boxes[i + 5].checked &&
      boxes[i + 6].checked &&
      boxes[i + 7].checked &&
      boxes[i + 8].checked &&
      boxes[i + 9].checked &&
      boxes[i + 10].checked &&
      boxes[i + 11].checked &&
      boxes[i + 12].checked &&
      boxes[i + 13].checked &&
      boxes[i + 14].checked &&
      boxes[i + 15].checked &&
      boxes[i + 16].checked &&
      boxes[i + 17].checked &&
      boxes[i + 18].checked &&
      boxes[i + 19].checked &&
      boxes[i + 20].checked &&
      boxes[i + 21].checked &&
      boxes[i + 22].checked &&
      boxes[i + 23].checked &&
      boxes[i + 24].checked &&
      boxes[i + 25].checked &&
      boxes[i + 26].checked &&
      boxes[i + 27].checked &&
      boxes[i + 28].checked &&
      boxes[i + 29].checked &&
      boxes[i + 30].checked &&
      boxes[i + 31].checked &&
      boxes[i + 32].checked
    ) {
      values.players()[player].classList.add("winPlayer");
      let placering = document.createElement("p");
      placering.classList.add("placeReset");
      values.players()[player].appendChild(placering);
      placering.innerHTML = `${place}. pladsen`;
      values.players()[player].style.pointerEvents = "none";
      // makes the historry array in the scope
      let historyArray = [];
      let historyJSON = localStorage.getItem("history");
      // if exists append player or add to points
      if (historyJSON) {
        historyArray = JSON.parse(historyJSON);
        let historikSpiller = historyArray.find(
          (x) => x["playername"] == values.playerNames()[player].value
        );
        if (historikSpiller) {
          historikSpiller.place++;
        } else {
          historyArray.push({
            playername: values.playerNames()[player].value,
            place: place,
          });
        }
      } else {
        historyArray = [
          { playername: values.playerNames()[player].value, place: place },
        ];
      }
      // always saves here
      localStorage.setItem("history", JSON.stringify(historyArray));

      // localStorage.setItem("place", place);
      // let storagePoint = localStorage.getItem("place");
      // //
      // localStorage.setItem("name", values.playerNames()[player].value);
      // let storageNames = localStorage.getItem(
      //   values.playerNames()[player].value
      // );
      //
      //

      localStorage.getItem("player");

      if (p + 1 == values.players().length) {
        values.round--;
        next();
        Swal.fire(
          `<img src='img/trophy.gif'><p class='winRespond'><b>Tillykke</b><b> ${
            values.playerNames()[player].value
          }!</b><br><br>du tog ${place} pladsen<br><br>efter ${
            values.round
          } Runde </p>`,
          "",
          ""
        );
        values.round++;
        place++;
        document.querySelector(
          ".round"
        ).innerHTML = `Runde: <br><b>${values.round}</b>`;
        celebrate();
        setTimeout(() => {
          celebrate();
        }, "1000");
        return;
      }
      next();

      Swal.fire(
        `<img src='img/trophy.gif'><p class='winRespond'><b>Tillykke</b><b> ${
          values.playerNames()[player].value
        }!</b><br><br>du tog ${place} pladsen<br><br>efter ${
          values.round
        } Runde </p>`,
        "",
        ""
      );

      //
      place++;
      /* p++; */

      celebrate();
      setTimeout(() => {
        celebrate();
      }, "1000");
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
//Start game tæller spillere med et true index, og tilføjer click events
//Spiller 2
function fullPlateTwo() {
  let boxes = document.querySelectorAll(".check input");
  v = 66;
  g = 33;
  let player = 1;
  fullPlate(boxes, v, g, player);
}
function checkPlateTwo() {
  values.players()[1].addEventListener("click", () => {
    fullPlateTwo();
  });
}
//Spiller 3
function fullPlateThree() {
  let boxes = document.querySelectorAll(".check input");
  v = 99;
  g = 66;
  let player = 2;
  fullPlate(boxes, v, g, player);
}
function checkPlateThree() {
  values.players()[2].addEventListener("click", () => {
    fullPlateThree();
  });
}
//Spiller 4
function fullPlateFour() {
  let boxes = document.querySelectorAll(".check input");
  v = 132;
  g = 99;
  let player = 3;
  fullPlate(boxes, v, g, player);
}
function checkPlateFour() {
  values.players()[3].addEventListener("click", () => {
    fullPlateFour();
  });
}
//Spiller 5
function fullPlateFive() {
  let boxes = document.querySelectorAll(".check input");
  v = 165;
  g = 132;
  let player = 4;
  fullPlate(boxes, v, g, player);
}
function checkPlateFive() {
  values.players()[4].addEventListener("click", () => {
    fullPlateFive();
  });
}
//Spiller 6
function fullPlateSix() {
  let boxes = document.querySelectorAll(".check input");
  v = 200;
  g = 165;
  let player = 5;
  fullPlate(boxes, v, g, player);
}
function checkPlateSix() {
  values.players()[5].addEventListener("click", () => {
    fullPlateSix();
  });
}

// Confetti Celebration
function celebrate() {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();

  //Confetti
  //Colors
  jsConfetti.addConfetti({
    emojis: ["🎯", "🎯", "🎯", "🎯", "🎯", "🎯"],
    emojiSize: 50,
    confettiNumber: 20,
  });
}

/* -------------------------------------------------------------------------- */
/*                            Spil Information boks                           */
/* -------------------------------------------------------------------------- */
//Åbne
infoBut.addEventListener("click", () => {
  document.querySelector(".information").classList.add("ani");
  document.querySelector(".information").classList.remove("aniOut");
});
//Lukke
document.querySelector(".shortExit").addEventListener("click", () => {
  document.querySelector(".information").classList.remove("ani");
  document.querySelector(".information").classList.add("aniOut");
});
/* -------------------------------------------------------------------------- */
/*                            Spil Historik boks                              */
/* -------------------------------------------------------------------------- */
//Åbne
logBut.addEventListener("click", () => {
  console.log("hej");
  document.querySelector(".historik").classList.add("ani");
  document.querySelector(".historik").classList.remove("aniOut");
  historyReceive();
});
//Lukke
document.querySelector(".exitLog").addEventListener("click", () => {
  document.querySelector(".historik").classList.remove("ani");
  document.querySelector(".historik").classList.add("aniOut");

  let remLog = document.querySelectorAll(".scoreboard");
  for (o = 0; o < remLog.length; o++) remLog[o].remove();
});
function historyReceive() {
  // gets the JSON from the storage
  let historyJSON2 = localStorage.getItem("history");
  if (historyJSON2) {
    // if exsists makes into an array
    let historyArray2 = JSON.parse(historyJSON2);
    console.log(historyArray2);
    for (let i in historyArray2) {
      // write out the historic players
      const historikSpiller = document.createElement("div");
      historikSpiller.classList.add("scoreboard");
      historikSpiller.innerHTML = `<h2 class='saveName'>${historyArray2[i].playername}</h2> <p>-</p><b class='savePoint'>${historyArray2[i].place} point</b>`;
      document.querySelector(".spillere").appendChild(historikSpiller);
    }
  }
}
/* -------------------------------------------------------------------------- */
/*                                  Upcomming                                 */
/* -------------------------------------------------------------------------- */

/* function {
  let saveRounds = (document.cookie = values.round);
  localStorage.setItem(values.round, saveRounds);
  let saveNames = (document.cookie = values.playerNames()[p]);
  localStorage.setItem(values.playerNames(), saveNames);
} */
/* let roundStorage = sessionStorage.getItem("saveRounds", "saveName"); */

/*
 */
/* -------------------------------------------------------------------------- */
/*                               Tæller spillere                              */
/* -------------------------------------------------------------------------- */
function playerCount() {
  for (c = 0; c < values.players().length; c++)
    switch (c) {
      case 0:
        values.players()[0].addEventListener("click", () => {
          fullPlateOne();
        });
        break;
      case 1:
        values.players()[1].addEventListener("click", () => {
          fullPlateTwo();
        });
        break;
      case 2:
        values.players()[2].addEventListener("click", () => {
          fullPlateThree();
        });
        break;
      case 3:
        values.players()[3].addEventListener("click", () => {
          fullPlateFour();
        });
        break;
      case 4:
        values.players()[4].addEventListener("click", () => {
          fullPlateFive();
        });
        break;
      case 5:
        values.players()[5].addEventListener("click", () => {
          fullPlateFive();
        });
        break;
    }

  /* p er value
  
  p = true */
}

const date = new Date();
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
document.querySelector(".date").innerHTML = `Dato ${day}-${month} | ${h}:${m}`;

saveBut.addEventListener("click", () => {
  html2canvas(document.querySelector(".historik")).then((canvas) => {
    document.querySelector(".imgSaver").style.display = "block";
    document.querySelector(".imgSaver").appendChild(canvas);
    /* let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
   console.log(image)
   window.location.href=image; */
    console.log("gg");
  });
});

backBut.addEventListener("click", () => {
  document.querySelector(".imgSaver").style.display = "none";
});

//Lave et helt nyt spil til multiplayer.
//
// Laveste point skal start i næste spil. osv.
// 1 spiller færdig, resterende spillere mangler samme antal kryder = highscore spil (Højest point) får 2.pladsen.
// Turnering(Dartskive(normal dart)(udskriver værdi));
// Historik udvidelse.  Runder, Point(på dagen), point(samlet(1. pladsen = 1 point(ikke samlede værdi af 6. spil)) ), runder(over året).
//færreste point spiller først.
// Pil taste genveje.
// hurtigere næste spiller
// Spiller 1 og Spiller 2 på samme hold. Skifter for hver tur.
//Optimere mest til tablet.
//Genstart plads placering, slet class med winner.
//
//Opdel single spiller og multi (så værdier ikke samles)
//
//Jesper/Jacob, Lars/Razzer, Morten/Torben ( Altids point ) && Dagens spil (6 spil)(Oktober);
//Jesper/Jacob = 17, Lars/Razzer = 15, Morten/Torben = 16. // 
