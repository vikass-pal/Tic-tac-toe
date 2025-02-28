const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgame = document.querySelector(".btn");


let currentplayer;
let gamegrid;

const winningposition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

function initgame() {
    currentplayer = "X";
    gamegrid = ["", "","","","","","","",""];
    newgame.classList.remove("remove");
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

initgame();

function swapturn() {
    if(currentplayer === "X") {
        currentplayer = "O";
    }
    else {
        currentplayer ="X";
    }
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}
function checkgameover(){
   let answer = "";

   winningposition.forEach((position) => {
    if((gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "")
    && (gamegrid[position[0]] === gamegrid[position[1]]) && (gamegrid[position[1]] === gamegrid[position[2]])) {
        if(gamegrid[position[0]] === "X")
            answer = "X";
        else
        answer = "O";

        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }
   });


   if(answer !== "") {
    gameinfo.innerText = `Winner Player - ${answer}`;
    newgame.classList.add("active");
    // newgame.classList.remove("active");
    return;
 }
 let fillcount = 0;
gamegrid.forEach((box) => {
    if(box !== "")
        fillcount++;
});

if(fillcount === 9) {
    gameinfo.innerText = "Game is Tied";
    newgame.classList.add("active");
}
}




function handleclick(index) {
    if(gamegrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";

        swapturn();
        checkgameover();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
         handleclick(index);
    })
});


newgame.addEventListener("click", initgame);