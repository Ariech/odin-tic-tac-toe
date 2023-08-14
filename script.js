const gameboard = (() => {
  let board = Array(9).fill("");

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  const placeMark = (index, mark) => {
    board[index] = mark;
  };

  return {
    board,
    resetBoard,
    placeMark,
  };
})();

const boardView = (() => {
  const boardContainer = document.querySelector(".board-container");

  const displayBoard = (board) => {
    clearBoard();
    board.forEach((cell, index) => {
      const divCell = document.createElement("div");
      divCell.textContent = `${cell}`;
      divCell.classList.add("cell");
      divCell.dataset.cell = `${index}`;
      boardContainer.append(divCell);
      console.log(cell);
    });
  };

  const clearBoard = () => {
    boardContainer.textContent = "";
  };

  return { displayBoard };
})();

const displayController = (() => {
  const resetButton = document.querySelector(".reset");
  const players = [
    { name: "player X", mark: "X" },
    { name: "player O", mark: "O" },
  ];

  gameboard.placeMark(0, "X");
  boardView.displayBoard(gameboard.board);

  resetButton.addEventListener("click", () => {
    gameboard.resetBoard();
    boardView.displayBoard(gameboard.board);
  });

  return { players };
})();

boardView.displayBoard(gameboard.board);
