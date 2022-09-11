// Tilføj spiller
document.querySelector(".add").addEventListener("click", function addPlayer() {
  console.log("clicked");
  /* let name = prompt("Hvad er spillerens navn?"); */
  (async () => {
    const { value: text } = await Swal.fire({
      title: "Skriv holdets navn",
      input: "text",
      inputLabel: "Afslut med Enter",
      inputPlaceholder: "Skriv holdets navn",
    });

    if (text) {
      /* Swal.fire(`Entered email: ${text}`) */
      const addPlayer = document.createElement("div");
      addPlayer.innerHTML = `<div class="player">
      <span class="empty"><input value='${text}'></input><i class="rem fa-sharp fa-solid fa-xmark"></i></span>
      <span class="check checkOne"><input class='checky' id='check' type="checkbox"><input class='checkyy' type="checkbox"><input class='checkyyy' type="checkbox"></input></span>
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
      boxAdd();
    }
  })();

  /* if (name === "h") {
  } else {
    const addPlayer = document.createElement("div");
    addPlayer.innerHTML = `<div class="player">
      <span class="empty"><input value='${name}'></input><i class="rem fa-sharp fa-solid fa-xmark"></i></span>
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
      <span class="check"><input type="checkbox"><input type="checkbox"><input type="checkbox"></input></span>
      </div>`;
    document.querySelector(".dart-body").appendChild(addPlayer);
  } */
});

//Fjern Spiller

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

function boxAdd() {
  let checky = document.querySelector(".checky");
  let checkyy = document.querySelector(".checkyy");
  let checkyyy = document.querySelector(".checkyyy");

  checkyyy.addEventListener("click", (event) => {
    if (checkyyy.checked && checkyy.checked && checky.checked) {
      alert("Checkbox checked!");
    }
  });
}
