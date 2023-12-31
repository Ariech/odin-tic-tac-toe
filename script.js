const boardContainer = document.querySelector(".board-container");
const playerTurn = document.querySelector(".turn");

const gameBoard = (() => {
  let board = Array(9).fill("");

  const getBoard = () => board;

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  const placeMark = (index, mark) => {
    board[index] = mark;
  };

  return {
    getBoard,
    resetBoard,
    placeMark,
  };
})();

const boardView = (() => {
  const displayBoard = (board) => {
    clearBoard();
    board.forEach((cell, index) => {
      const divCell = document.createElement("div");
      divCell.textContent = `${cell}`;
      divCell.classList.add("cell");
      divCell.dataset.cell = `${index}`;
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
  const playerTurn = document.querySelector(".turn");

  const showPlayerTurn = () => {
    playerTurn.textContent = `Player ${gameState.getCurrentPlayer().name} turn`;
  };

  const placeMarkOnBoard = (e, currentPlayerMark) => {
    if (e.target.textContent !== "") {
      return;
    }
    e.target.textContent = currentPlayerMark;
  };

  const createListenerOnBoard = () => {
    boardContainer.addEventListener("click", handleClicksOnBoard);
  };

  const removeListenerOnBoard = () => {
    boardContainer.removeEventListener("click", handleClicksOnBoard);
  };

  const handleClicksOnBoard = (e) => {
    if (e.target.dataset.cell && e.target.textContent === "") {
      placeMarkOnBoard(e, gameState.getCurrentPlayerMark());
      gameBoard.placeMark(
        e.target.dataset.cell,
        gameState.getCurrentPlayerMark()
      );
      gameState.checkGameCondition();
    }
  };

  resetButton.addEventListener("click", () => {
    gameBoard.resetBoard();
    boardView.displayBoard(gameBoard.getBoard());
    gameState.setInitPlayer();
    createListenerOnBoard();
  });

  return {
    createListenerOnBoard,
    removeListenerOnBoard,
    showPlayerTurn,
  };
})();

const gameState = (() => {
  const players = [
    { name: "X", mark: "X" },
    { name: "O", mark: "O" },
  ];

  const board = gameBoard.getBoard();

  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let activePlayer = players[0];

  const getCurrentPlayer = () => activePlayer;

  const getCurrentPlayerMark = () => getCurrentPlayer().mark;

  const setInitPlayer = () => (activePlayer = players[0]);

  const changePlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkForWinner = () => {
    let win = false;

    // Iterate over winning combos
    winningCombo.forEach((combination) => {
      // Check if the current index of the combination matches the mark of the active player
      const match = combination.every(
        (index) => board[index] === getCurrentPlayerMark()
      );
      if (match) {
        win = true;
        combination.forEach((index) =>
          boardContainer.childNodes[index].classList.add("cell-winning")
        );
      }
    });
    return win;
  };

  const checkForTie = () => {
    // Check if every position on the board has a mark on it
    const tie = board.every((item) => item !== "");

    return tie;
  };

  const checkGameCondition = () => {
    const isWin = checkForWinner();
    const isTie = checkForTie();

    if (!isWin) {
      gameState.changePlayerTurn();
      displayController.showPlayerTurn();
    }

    if (isWin) {
      playerTurn.textContent = `Player ${
        gameState.getCurrentPlayer().name
      } won!`;
      displayController.removeListenerOnBoard();
      return true;
    }

    if (isTie && !isWin) {
      playerTurn.textContent = `It's a tie!`;
      return true;
    }
  };

  return {
    getCurrentPlayerMark,
    getCurrentPlayer,
    setInitPlayer,
    changePlayerTurn,
    checkGameCondition,
  };
})();

boardView.displayBoard(gameBoard.getBoard());
displayController.createListenerOnBoard();
displayController.showPlayerTurn();
