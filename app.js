let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

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
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      console.log("o");
      box.innerText = "o";
      turn0 = false;
    } else {
      console.log("x");
      box.innerText = "x";
      turn0 = true;
    }
    box.disabled = true;
    checkwinner();
  });
});

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

const showWinner = (Winner) => {
  msg.innerText = `Congratulation Winner is ${Winner}`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

const checkwinner = () => {
  for (let pattern of winpattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("Winner", pos1val);
        showWinner(pos1val);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
