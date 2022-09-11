// Tilføj spiller
document.querySelector(".add").addEventListener("click", function addPlayer() {
  console.log("clicked");
  let name = prompt("Hvad er spillerens navn?");
  const addPlayer = document.createElement("div");
  addPlayer.innerHTML = `<div class="player">
     <span class="empty"><input value='${name}'></input></span>
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
});

//Fjern Spiller

document
  .querySelector(".remove")
  .addEventListener("click", function remPlayer() {
    const addPlayer = document.querySelector(".player");
    console.log(addPlayer.value);
    addPlayer.remove();
  });











  
/* let points = document
  .querySelectorAll(".check")
  .addEventListener("click", function addPoint() {
    console.log(points);
  }); */


const cursorRounded = document.querySelector('.rounded');
const cursorPointed = document.querySelector('.pointed');


const moveCursor = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
   
  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  
  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
 
}

window.addEventListener('mousemove', moveCursor)