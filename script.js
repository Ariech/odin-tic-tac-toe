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

      divCell.addEventListener("click", (e) => {
        displayController.placeMarkOnBoard(
          e,
          gameState.getCurrentPlayer().mark
        );
        gameboard.placeMark(
          e.target.dataset.cell,
          gameState.getCurrentPlayer().mark
        );
        gameState.changePlayerTurn();
      });

      boardContainer.append(divCell);
    });
  };

  const clearBoard = () => {
    boardContainer.textContent = "";
  };

  return { displayBoard };
})();

const displayController = (() => {
  const resetButton = document.querySelector(".reset");

  const placeMarkOnBoard = (e, currentPlayerMark) => {
    if (e.target.textContent !== "") {
      return;
    }
    e.target.textContent = currentPlayerMark;
  };

  // gameboard.placeMark(0, "X");
  // boardView.displayBoard(gameboard.board);

  resetButton.addEventListener("click", () => {
    gameboard.resetBoard();
    boardView.displayBoard(gameboard.board);
  });

  return { placeMarkOnBoard };
})();

const gameState = (() => {
  const players = [
    { name: "player X", mark: "X" },
    { name: "player O", mark: "O" },
  ];

  let activePlayer = players[0];

  const getCurrentPlayer = () => activePlayer;

  const changePlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  return { getCurrentPlayer, changePlayerTurn };
})();

boardView.displayBoard(gameboard.board);
