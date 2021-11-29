// Board loader document

var board = {

    drawBoard:function () {
        app.points = 0,
        document.querySelector('.start').style.display = "";
        document.querySelector('.points').style.display = "none";
        document.querySelector('.points').textContent = "points : " + app.points;
        document.querySelector('.tryAgain').style.display = "none";
    
        // target the div with id board to insert our rows
        const boardDiv = document.getElementById('board')
        boardDiv.innerHTML="";
    
        for (let row = 1; row < 21; row++) {
          cellRow = document.createElement('div');
          cellRow.classList.add('cellRow');
          cellRow.id = 'row'+ row ;
          boardDiv.append(cellRow);
          // Once a raw is created, fill it with 6 cells
          for (let cell = 1; cell < 21; cell++) {
            cellToInsert = document.createElement('div');
            cellToInsert.classList.add('cell');
            cellToInsert.dataset.row = row;
            cellToInsert.dataset.cell = cell;
            cellRow.append(cellToInsert)
          }
        }
        board.randomStartSnake();
        snake.snakeLength = 0;
        board.randomApple();
        console.log(app.points)
    },

    randomNumberGenerator: function() {
        const boardDiv = document.getElementById('board')
        // Count the number of rows in the board
        const RowAndCellLenght = boardDiv.querySelectorAll('.cellRow').length
        const randomPos = Math.floor(Math.random() * RowAndCellLenght +1);
        return randomPos
    },

    randomStartSnake: function() {
        const randomDataRowStart = board.randomNumberGenerator();
        const randomDataCellStart = board.randomNumberGenerator();
        // Get the new starting cell according to the random generated numbers
        const startingCell = document.querySelector('[data-row = "'+randomDataRowStart+'"][data-cell = "'+randomDataCellStart+'"]');
        // Add the classes to the new random selected cell
        startingCell.classList.add('cellStart', 'cellCurrent', 'cellCurrent-right')
    },
    
    randomApple: function() {
        const randomDataRowApple = board.randomNumberGenerator();
        const randomDataCellApple = board.randomNumberGenerator();
        // Get the new starting cell according to the random generated numbers
        const apple = document.querySelector('[data-row = "'+randomDataRowApple+'"][data-cell = "'+randomDataCellApple+'"]');
        
        if(apple.classList.contains('body') || apple.classList.contains('cellCurrent')) {
            board.randomApple();
        }else {
            // Add the classes to the new random selected cell
            apple.classList.add('apple')
        }
    },
}
