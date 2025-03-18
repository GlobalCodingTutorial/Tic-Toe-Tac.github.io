let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player starts first

const winpattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgcontainer.classList.add("hide");
  resetbtn.classList.remove("hide"); // Unhide reset button on new game
};

// Player Move
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      box.disabled = true;
      turn0 = false;
      checkwinner();
      if (!turn0) {
        setTimeout(computerMove, 500); // Small delay to mimic real gameplay
      }
    }
  });
});

// Computer Move - Selects a random available box
const computerMove = () => {
  let availableBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (availableBoxes.length > 0) {
    let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turn0 = true;
    checkwinner();
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
  resetbtn.classList.add("hide"); // Hide reset button when winner is found
};

const checkwinner = () => {
  for (let pattern of winpattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
      showWinner(pos1val);
      return;
    }
  }

  // Check for Draw
  if ([...boxes].every((box) => box.innerText !== "")) {
    msg.innerText = "It's a Draw!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);