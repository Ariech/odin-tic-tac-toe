const gameBoard = (() => {
  const boardContainer = document.querySelector(".board-container");

  const board = Array(9).fill("");

  const displayBoard = () => {
    board.forEach((cell, index) => {
      const divCell = document.createElement("div");
      divCell.textContent = "X";
      divCell.classList.add("cell");
      divCell.dataset.cell = `${index}`;
      boardContainer.append(divCell);
    });
  };

  const resetBoard = () => {
    const cellsNodeList = document.querySelectorAll(".cell");

    cellsNodeList.forEach((cell) => {
      if (cell.classList.contains("cell")) {
        cell.textContent = "";
      }
    });
  };

  displayBoard();

  return {
    board,
    displayBoard,
    resetBoard,
  };
})();

const displayController = () => {
  let mark;
};

const playerFactory = (name, mark) => {
  return { name, mark };
};
