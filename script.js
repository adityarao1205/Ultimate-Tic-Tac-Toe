const boxes = document.querySelectorAll(".cell");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let startbtn = document.querySelector("#startbtn");
let restartbtn = document.querySelector("#restartbtn");
let exitbtn = document.querySelector("#exitbtn");
let turno = true;
let gameactive = true;
const winningpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const usedColor = "#FFFFFF"; 
const colorX = "#FFD700"; 
const colorO = "#800000"; 

// Function to reset the game state
const resetGame = () => {
    boxes.forEach((cell) => {
        cell.innerText = "";
        cell.style.color = ""; 
        cell.style.pointerEvents = "auto"; 
        cell.classList.remove("winning-combination"); // Remove any previous highlight
    });
    msgcontainer.style.visibility = "hidden"; 
    msgcontainer.style.opacity = "0"; 
    turno = true;
    gameactive = true;
    document.querySelector(".grid").style.visibility = "visible"; 
    document.querySelector(".grid").style.opacity = "1";
    document.querySelector(".players-container").style.visibility = "visible";
    document.querySelector(".players-container").style.opacity = "1";
    restartbtn.style.visibility = "visible";
    restartbtn.style.opacity = "1";
    exitbtn.style.visibility = "visible";
    exitbtn.style.opacity = "1";
    startbtn.style.visibility = "hidden"; 
};

// Start the game
const startgame = () => {
    gameactive = true;
    resetGame();
    updatePlayerDisplay();
};

// Restart the game
const restartgame = () => {
    gameactive = true;
    resetGame();
    updatePlayerDisplay();
};

// Exit the game
const exitgame = () => {
    gameactive = false;
    document.querySelector(".grid").style.visibility = "hidden";
    document.querySelector(".grid").style.opacity = "0";
    restartbtn.style.visibility = "hidden";
    restartbtn.style.opacity = "0";
    exitbtn.style.visibility = "hidden";
    exitbtn.style.opacity = "0";
    startbtn.style.visibility = "visible"; 
    msgcontainer.style.visibility = "hidden"; 
    msgcontainer.style.opacity = "0"; 
    document.querySelector(".players-container").style.visibility = "hidden";
};

boxes.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (!gameactive || cell.innerText !== "") return;

        if (turno) {
            cell.innerText = "O";
            cell.style.color = colorO; 
            turno = false;
        } else {
            cell.innerText = "X";
            cell.style.color = colorX;
            turno = true;
        }
        cell.style.pointerEvents = "none"; 
        checkwinner();
        updatePlayerDisplay()
    });
});

const checkwinner = () => {
    for (let patterns of winningpatterns) {
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                highlightWinningCells(patterns); 
                showwinner(pos1);
                return;
            }
        }
    }
    if (Array.from(boxes).every(cell => cell.innerText !== "") && gameactive) {
        showdraw();
    }
};

const showwinner = (winnerofgame) => {
    msg.innerText = `Winner is ${winnerofgame}`;
    msgcontainer.style.visibility = "visible";
    msgcontainer.style.opacity = "1";
    msgcontainer.classList.add("winner");
    gameactive = false;
    document.querySelector(".grid").style.visibility = "visible"; 
    document.querySelector(".players-container").style.visibility = "hidden";
    document.querySelector(".players-container").style.opacity = "0";
};

// Show draw message
const showdraw = () => {
    msg.innerText = "It's a draw!";
    msgcontainer.style.visibility = "visible";
    msgcontainer.style.opacity = "1";
    msgcontainer.classList.add("draw");
    gameactive = false;
    document.querySelector(".grid").style.visibility = "visible"; 
    document.querySelector(".players-container").style.visibility = "hidden";
    document.querySelector(".players-container").style.opacity = "0";
};

// Highlight the winning combination
const highlightWinningCells = (winningCells) => {
    winningCells.forEach(index => {
        boxes[index].classList.add("winning-combination");
    });
};

startbtn.addEventListener("click", startgame);
restartbtn.addEventListener("click", restartgame);
exitbtn.addEventListener("click", exitgame);

document.querySelector(".grid").style.visibility = "hidden";

const updatePlayerDisplay = () => {
    document.getElementById("player-o").style.backgroundColor = "#004080"; 
    document.getElementById("player-x").style.backgroundColor = "#004080";

    // Highlight the current player
    if (turno) {
        document.getElementById("player-o").style.backgroundColor = "#800000"; 
        document.getElementById("player-x-symbol").innerText = ""; 
        document.getElementById("player-o-symbol").innerText = "O"; 
    } else {
        document.getElementById("player-x").style.backgroundColor = "#FFD700"; 
        document.getElementById("player-o-symbol").innerText = ""; 
        document.getElementById("player-x-symbol").innerText = "X"; 
    }
};
