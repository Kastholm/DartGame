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
      addPlayer.innerHTML = `<div class="player">
      <span class="empty"><input value='${text}'></input></span>
      <span class="check checkTyve"><input  class='tyve' type="checkbox"><input class='tyve' type="checkbox"><input class='tyve' type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      </div>`;
      document.querySelector(".dart-body").appendChild(addPlayer);
      document.querySelector(".start").style.display = "block";
      document.querySelector(".restart").style.marginLeft = ".5em";
      const log = document.createElement("p");
      document.querySelector(".activity").appendChild(log);
      log.innerHTML = `<p>'${text}' er blevet føjet til spillet</p>`;
      document
        .querySelector(".checkTyve")
        .addEventListener("click", function tyvve() {
          const log = document.createElement("p");
          document.querySelector(".activity").appendChild(log);
          log.innerHTML = `<p>'${text}' fik en 20'er</p>`;
        });
      /*  if(document.querySelectorAll('.tyve')[0].checked & document.querySelectorAll('.tyve')[1].checked && document.querySelectorAll('.tyve')[2].checked){
        document.querySelector('.tyve').style.fontSize = "5rem";
      } */
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
    }
    else if (e.code === "KeyS") {
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
    }
    else if (e.code === "KeyT") {
      console.log('t')
    }
  }
}
StartSpil();

//Arrow Functions
