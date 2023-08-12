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

    displayBoard();

    return {
        board,
        displayBoard,
    };
})();
