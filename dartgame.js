//Player Index
function callPlayer(text) {
  return `<div class="player">
<span class="empty"><input value='${text}'/><i class="fa-regular fa-xmark trashPlayer"></i></span>

<span class="check field" onclick='triplechecked()' ><input class='checked' type="checkbox"><input class='checked' type="checkbox"/><input class='checked' type="checkbox"/></span>

<span class="check fieldNitten" onclick='tripleNitten()'><input class='nitten' type="checkbox"/><input class='nitten' type="checkbox"/><input class='nitten' type="checkbox"/></span>

<span class="check fieldatten" onclick='tripleatten()' ><input class='atten' type="checkbox"/><input class='atten' type="checkbox"/><input class='atten' type="checkbox"/></span>

<span class="check fieldsytten" onclick='triplesytten()'><input class='sytten' type="checkbox"/><input class='sytten' type="checkbox"/><input class='sytten' type="checkbox"/></span>

<span class="check fieldseksten" onclick='tripleseksten()'><input class='seksten' type="checkbox" /><input class='seksten' type="checkbox" /><input class='seksten' type="checkbox" /></span>

<span class="check fieldfemten" onclick='triplefemten()'><input type="checkbox" class='femten' /><input type="checkbox" class='femten' /><input type="checkbox" class='femten' /></span>

<span class="check  fieldfjorten" onclick='triplefjorten()'><input class='fjorten' type="checkbox"/><input class='fjorten' type="checkbox"/><input class='fjorten' type="checkbox"/></span>

<span class="check fieldtretten" onclick='tripletretten()'><input type="checkbox" class='tretten'/><input type="checkbox" class='tretten'/><input type="checkbox" class='tretten'/></span>

<span class="check fieldtripple" onclick='tripletripple()'><input class='tripple' type="checkbox"/><input class='tripple' type="checkbox"/><input type="checkbox" class='tripple'/></span>

<span class="check fielddouble" onclick='tripledouble()'><input class='double' type="checkbox"/><input class='double' type="checkbox"/><input class='double' type="checkbox"/></span>

<span class="check fieldbull" onclick='triplebull()'><input class='bull' type="checkbox"><input class='bull' type="checkbox"><input type="checkbox" class='bull'></span>
</div>`;
}

//// Dart Spil begynder ////

// Tilføj spiller
document.querySelector(".add").addEventListener("click", function addPlayer() {
  console.log("clicked");
  (async () => {
    const { value: text } = await Swal.fire({
      title: "Skriv holdets navn",
      input: "text",
      inputLabel: "Afslut med Enter",
      inputPlaceholder: "Skriv holdets navn",
    });

    if (text) {
      const addPlayer = document.createElement("div");
      addPlayer.innerHTML = callPlayer(text);
      document.querySelector(".dart-body").appendChild(addPlayer);
      document.querySelector(".start").style.display = "block";
      document.querySelector(".restart").style.marginLeft = ".5em";
    }
  })();
});

//Fjern Spiller
function remPlayer() {
  console.log(document.querySelectorAll(".player").length);
  console.log("space");
  console.log(document.querySelectorAll(".rem").length);
  Swal.fire({
    title: "Vil du slette spiller og progression?",
    showDenyButton: true,
    confirmButtonText: "Slet",
    denyButtonText: `Slet ikke`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      switch (document.querySelectorAll(".player").length) {
        case 1:
          document.querySelectorAll(".player")[0].remove();
          break;
        case 2:
          document.querySelectorAll(".player")[1].remove();
          break;
        case 3:
          document.querySelectorAll(".player")[2].remove();
          break;
        case 4:
          document.querySelectorAll(".player")[3].remove();
          break;
        case 5:
          document.querySelectorAll(".player")[4].remove();
          break;
        case 6:
          document.querySelectorAll(".player")[5].remove();
          break;
        case 7:
          document.querySelectorAll(".player")[6].remove();
          break;
        case 8:
          document.querySelectorAll(".player")[7].remove();
          break;
      }
    } else if (result.isDenied) {
      Swal.fire("Spilleren er ikke slettet", "", "info");
    }
  });
}

//Genstart Spil
document
  .querySelector(".restart")
  .addEventListener("click", function restartGame() {
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
          }, 1500);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annuleret",
            "Tidligere spil forsætter",
            "error"
          );
        }
      });
  });

/* let points = document
.querySelectorAll(".check")
.addEventListener("click", function addPoint() {
     console.log(points);
}); */

const cursorRounded = document.querySelector(".rounded");
const cursorPointed = document.querySelector(".pointed");

const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;

  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.addEventListener("mousemove", moveCursor);

/* const removes = document
  .querySelectorAll(".fa-xmark");
    removes.forEach((player) => {
      deleteUser(player);
    });
 */
/* 
const players = document.querySelectorAll(".player");

players.forEach((box, index) => {
  if (index === 0) return;
  box.style.display = "none";
});
 */

/* function boxAdd() {
  let checky = document.querySelector(".checky");
  let checkyy = document.querySelector(".checkyy");
  let checkyyy = document.querySelector(".checkyyy");

  checkyyy.addEventListener("click", (event) => {
    if (checkyyy.checked && checkyy.checked && checky.checked) {
      alert("Checkbox checked!");
    }
  });
} */

// Start DartGame
let player = 0;
function StartSpil() {
  let startGame = true;
  let playCount = document.querySelectorAll(".player").length;

  document.querySelector(".start").addEventListener("click", function start() {
    console.log(startGame);
    if (startGame === true) {
      document.querySelectorAll(".player")[0].classList.add("activePlayer");
      document.querySelector(".start").innerHTML = "Stop Spil";
      document.querySelector(".add").style.display = "none";
      document.querySelector(".remove").style.display = "none";
      document.querySelector(".next").style.display = "block";
      document.querySelector(".prev").style.display = "block";
    } else if (startGame === false) {
      document.querySelector(".start").innerHTML = "Start Spil";
      document.querySelectorAll(".player")[0].classList.remove("activePlayer");
      document.querySelector(".add").style.display = "block";
      document.querySelector(".remove").style.display = "block";
      document.querySelector(".next").style.display = "none";
      document.querySelector(".prev").style.display = "none";
    }
    startGame = !startGame;
  });

  // Næste Spiller
  document.querySelector(".next").addEventListener("click", function next() {
    console.log(player);
    console.log(document.querySelectorAll(".player").length);

    switch (player) {
      case document.querySelectorAll(".player").length:
        player--;
        break;
      default:
        player++;
        document
          .querySelectorAll(".player")
          [0 + player].classList.add("activePlayer");
        document
          .querySelectorAll(".player")
          [player - 1].classList.remove("activePlayer");
    }
  });

  // Forrige Spiller
  document.querySelector(".prev").addEventListener("click", function prev() {
    console.log(player);
    console.log(document.querySelectorAll(".player").length);

    switch (player) {
      case 0:
        player = 0;
        break;
      default:
        player--;
        document
          .querySelectorAll(".player")
          [player].classList.add("activePlayer");
        document
          .querySelectorAll(".player")
          [player + 1].classList.remove("activePlayer");

      /*     document.querySelectorAll(".player")[player].classList.add('.activePlayer');
        document.querySelectorAll(".player")[player + 1].classList.add('.activePlayer'); */
    }
  });

  // KeyPress Functions
  window.addEventListener("keydown", logKey);
  function logKey(e) {
    console.log(e.code);
    if (e.code === "ArrowRight") {
      switch (player) {
        case document.querySelectorAll(".player").length:
          player--;
          break;
        default:
          player++;
          document
            .querySelectorAll(".player")
            [0 + player].classList.add("activePlayer");
          document
            .querySelectorAll(".player")
            [player - 1].classList.remove("activePlayer");
      }
    } else if (e.code === "ArrowLeft") {
      switch (player) {
        case 0:
          player = 0;
          break;
        default:
          player--;
          document
            .querySelectorAll(".player")
            [player].classList.add("activePlayer");
          document
            .querySelectorAll(".player")
            [player + 1].classList.remove("activePlayer");
      }
    } else if (e.code === "KeyS") {
      if (startGame === true) {
        document.querySelectorAll(".player")[0].classList.add("activePlayer");
        document.querySelector(".start").innerHTML = "Stop Spil";
        document.querySelector(".add").style.display = "none";
        document.querySelector(".remove").style.display = "none";
        document.querySelector(".next").style.display = "block";
        document.querySelector(".prev").style.display = "block";
      } else if (startGame === false) {
        document.querySelector(".start").innerHTML = "Start Spil";
        document
          .querySelectorAll(".player")[0]
          .classList.remove("activePlayer");
        document.querySelector(".add").style.display = "block";
        document.querySelector(".remove").style.display = "block";
        document.querySelector(".next").style.display = "none";
        document.querySelector(".prev").style.display = "none";
      }
      startGame = !startGame;
    } else if (e.code === "KeyT") {
      (async () => {
        const { value: text } = await Swal.fire({
          title: "Skriv holdets navn",
          input: "text",
          inputLabel: "Afslut med Enter",
          inputPlaceholder: "Skriv holdets navn",
        });

        if (text) {
          const addPlayer = document.createElement("div");
          addPlayer.innerHTML = callPlayer(text);
          document.querySelector(".dart-body").appendChild(addPlayer);
          document.querySelector(".start").style.display = "block";
          document.querySelector(".restart").style.marginLeft = ".5em";
        }
      })();
    } else if (e.code === "KeyF") {
      Swal.fire({
        title: "Vil du slette spiller og progression?",
        showDenyButton: true,
        confirmButtonText: "Slet",
        denyButtonText: `Slet ikke`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          switch (document.querySelectorAll(".player").length) {
            case 1:
              document.querySelectorAll(".player")[0].remove();
              break;
            case 2:
              document.querySelectorAll(".player")[1].remove();
              break;
            case 3:
              document.querySelectorAll(".player")[2].remove();
              break;
            case 4:
              document.querySelectorAll(".player")[3].remove();
              break;
            case 5:
              document.querySelectorAll(".player")[4].remove();
              break;
            case 6:
              document.querySelectorAll(".player")[5].remove();
              break;
            case 7:
              document.querySelectorAll(".player")[6].remove();
              break;
            case 8:
              document.querySelectorAll(".player")[7].remove();
              break;
          }
        } else if (result.isDenied) {
          Swal.fire("Spilleren er ikke slettet", "", "info");
        }
      });
    } else if (e.code === "KeyG") {
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
            }, 1500);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Annuleret",
              "Tidligere spil forsætter",
              "error"
            );
          }
        });
    }
  }
}
StartSpil();

let short = true;
document.querySelector(".shortExit").addEventListener("click", function exit() {
  console.log(short);
  if (!short) {
    document.querySelector(".shortcuts").classList.remove("minimize");
    document.querySelector(".shortExit").classList.remove("fa-arrow-left");
    document.querySelector(".shortExit").classList.add("fa-circle-xmark");
    document.querySelector(".shortcuts").style.top = "40%";
  } else {
    document.querySelector(".shortcuts").classList.add("minimize");
    document.querySelector(".shortExit").classList.add("fa-arrow-left");
    document.querySelector(".shortExit").classList.remove("fa-circle-xmark");
    document.querySelector(".shortcuts").style.top = "80%";
  }
  short = !short;
});

let ActivityToggle = true;
document
  .querySelector(".actiExit")
  .addEventListener("click", function exitTwo() {
    console.log(ActivityToggle);
    if (!ActivityToggle) {
      document.querySelector(".activity").classList.remove("minimize");
      document.querySelector(".actiExit").classList.remove("fa-arrow-left");
      document.querySelector(".actiExit").classList.add("fa-circle-xmark");
      document.querySelector(".activity").style.top = "2%";
    } else {
      document.querySelector(".activity").classList.add("minimize");
      document.querySelector(".actiExit").classList.add("fa-arrow-left");
      document.querySelector(".actiExit").classList.remove("fa-circle-xmark");
      document.querySelector(".activity").style.top = "70%";
    }
    ActivityToggle = !ActivityToggle;
  });

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

function fullRow(checked, field) {
  if (checked[0].checked && checked[1].checked && checked[2].checked) {
    field[0].classList.add("scored");
  } else {
    field[0].classList.remove("scored");
  }

  if (checked[3].checked && checked[4].checked && checked[5].checked) {
    field[1].classList.add("scored");
  } else {
    field[1].classList.remove("scored");
  }

  if (checked[6].checked && checked[7].checked && checked[8].checked) {
    field[2].classList.add("scored");
  } else {
    field[2].classList.remove("scored");
  }

  if (checked[9].checked && checked[10].checked && checked[11].checked) {
    field[3].classList.add("scored");
  } else {
    field[3].classList.remove("scored");
  }

  if (checked[12].checked && checked[13].checked && checked[14].checked) {
    field[4].classList.add("scored");
  } else {
    field[4].classList.remove("scored");
  }

  if (checked[15].checked && checked[16].checked && checked[17].checked) {
    field[5].classList.add("scored");
  } else {
    field[5].classList.remove("scored");
  }
}

function triplechecked() {
  const field = document.querySelectorAll(".field");
  const checked = document.querySelectorAll(".checked");
  fullRow(checked, field);
}

function tripleNitten() {
  const fieldnitten = document.querySelectorAll(".fieldNitten");
  const nitten = document.querySelectorAll(".nitten");
  console.log(this.value);
  fullRow(nitten, fieldnitten);
}

function tripleatten() {
  const fieldatten = document.querySelectorAll(".fieldatten");
  const atten = document.querySelectorAll(".atten");
  fullRow(atten, fieldatten);
}

function triplesytten() {
  const fieldsytten = document.querySelectorAll(".fieldsytten");
  const sytten = document.querySelectorAll(".sytten");
  fullRow(sytten, fieldsytten);
}

function tripleseksten() {
  const fieldseksten = document.querySelectorAll(".fieldseksten");
  const seksten = document.querySelectorAll(".seksten");
  fullRow(seksten, fieldseksten);
}

function triplefemten() {
  const fieldfemten = document.querySelectorAll(".fieldfemten");
  const femten = document.querySelectorAll(".femten");
  fullRow(femten, fieldfemten);
}

function triplefjorten() {
  const fieldfjorten = document.querySelectorAll(".fieldfjorten");
  const fjorten = document.querySelectorAll(".fjorten");
  fullRow(fjorten, fieldfjorten);
}

function tripletretten() {
  const fieldtretten = document.querySelectorAll(".fieldtretten");
  const tretten = document.querySelectorAll(".tretten");
  fullRow(tretten, fieldtretten);
}

function tripledouble() {
  const fielddouble = document.querySelectorAll(".fielddouble");
  const double = document.querySelectorAll(".double");
  fullRow(double, fielddouble);
}

function tripletripple() {
  const fieldtripple = document.querySelectorAll(".fieldtripple");
  const tripple = document.querySelectorAll(".tripple");
  fullRow(tripple, fieldtripple);
}

function triplebull() {
  const fieldbull = document.querySelectorAll(".fieldbull");
  const bull = document.querySelectorAll(".bull");
  fullRow(bull, fieldbull);
}
