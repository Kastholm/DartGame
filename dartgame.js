// Tilføj spiller
document.querySelector(".add").addEventListener("click", function addPlayer() {
  console.log("clicked");
  let name = prompt("Hvad er spillerens navn?");
  console.log(name);
  if (name === "") {
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
  }
});

//Fjern Spiller

//Genstart Spil
document
  .querySelector(".restart")
  .addEventListener("click", function restartGame() {
     const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Vil du genstarte spillet?',
          text: "Spillets progression vil blive genstartet!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ja, nyt spil!',
          cancelButtonText: 'Nej, forsæt spil!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Genstartet',
              'Et nyt spil starter',
              'success'
            )
            timer = setTimeout(() => {
               location.reload();
             }, 1500);
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Annuleret',
              'Tidligere spil forsætter',
              'error'
            )
          }
        })
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
