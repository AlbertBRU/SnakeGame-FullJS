// Snake document

var snake = {

    autoMove: function() {
        document.querySelector('.start').style.display = "none";
        document.querySelector('.points').style.display = "";
    
        intervalId = setInterval(snake.moveForward, 200)
      },

    moveForward: function() { 
    
        // Target the div who has the "cellCurrent" class
        const currentCell = document.querySelector('.cellCurrent');
        // We define that the board is 
        const board = document.getElementById('board');
        // We get the current cell data id to get the position of the player
        const currentDataCell = currentCell.dataset.cell;
        const currentDataRow = currentCell.dataset.row;
        
        // MY MAN WANT TO GO TO THE RIGHT ! =>
        if (currentCell.classList.contains('cellCurrent-right')) {
        // We prepare the data-cell where we want to go, and parseInt will transform the current cell position into an integer and allow us to add 1
        const siblingDataCell = parseInt(currentDataCell) + 1;
        // We select the cell to move, thanks to the right data-cell
        var siblingCell = document.querySelector('[data-row = "'+currentDataRow+'"][data-cell = "'+siblingDataCell+'"]');
        // if the sibling cell doesn't exist (if the user want to get out of the board)
        if (!siblingCell) {
            looserAlert.looserAlert();
            // we return to exit the function and prevent all classes to disapear!
            return;
        }else {
            // We change the classes to match the move
            siblingCell.classList.add('cellCurrent', 'cellCurrent-right');
        }
        }
        // MY MAN WANT TO GO TO THE BOTTOM ! 
        else if (currentCell.classList.contains('cellCurrent-bottom')) {
        const siblingDataRow = parseInt(currentDataRow) + 1;
        var siblingCell = document.querySelector('[data-row = "'+siblingDataRow+'"][data-cell = "'+currentDataCell+'"]');
        if (!siblingCell) {
            looserAlert.looserAlert();
            // we return to exit the function and prevent all classes to disapear!
            return;
        }else {
        siblingCell.classList.add('cellCurrent', 'cellCurrent-bottom');
        }
        }
        // MY MAN WANT TO GO TO THE LEFT ! <=
        else if (currentCell.classList.contains('cellCurrent-left')) {
        const siblingDataCell = parseInt(currentDataCell) - 1;
        var siblingCell = document.querySelector('[data-row = "'+currentDataRow+'"][data-cell = "'+siblingDataCell+'"]');
        if (!siblingCell) {
            looserAlert.looserAlert();
            // we return to exit the function and prevent all classes to disapear!
            return;
        }else {
            siblingCell.classList.add('cellCurrent', 'cellCurrent-left');
        }
        }
        // MY MAN WANT TO GO TO THE TOP ! 
        else if (currentCell.classList.contains('cellCurrent-top')) {
        const siblingDataRow = parseInt(currentDataRow) - 1;
        var siblingCell = document.querySelector('[data-row = "'+siblingDataRow+'"][data-cell = "'+currentDataCell+'"]');
        if (!siblingCell) {
            looserAlert.looserAlert();
            // we return to exit the function and prevent all classes to disapear!
            return;
        }else {
            siblingCell.classList.add('cellCurrent', 'cellCurrent-top');
        }
        }
        // In any success case, we will remove the classes cellCurrent, because we move, and the position of the cursor attached to the current cell class.
        currentCell.classList.remove('cellCurrent', 'cellCurrent-right', 'cellCurrent-bottom', 'cellCurrent-left', 'cellCurrent-top');
        // This if condition will f0f everything behind him, except Start Cell.
        // if (!currentCell.classList.contains('cellStart')) {
        //   currentCell.classList.add('cellPath');
        // }
        if (siblingCell.classList.contains('apple')) {
        snake.eat(siblingCell);
        }
        // if siblingCell contains -> snake part
        // app.bite() -> LooserAlert
        // console.log(siblingCell);
    },

    goLeft: function(currentCell) {
        if (currentCell.classList.contains('cellCurrent-bottom') || currentCell.classList.contains('cellCurrent-top') ) {
          currentCell.classList.remove('cellCurrent-bottom', 'cellCurrent-top')
          currentCell.classList.add('cellCurrent-left')
        } 
    },
    
    goRight: function(currentCell) {
        if (currentCell.classList.contains('cellCurrent-bottom') || currentCell.classList.contains('cellCurrent-top') ) {
          currentCell.classList.remove('cellCurrent-bottom', 'cellCurrent-top')
          currentCell.classList.add('cellCurrent-right')
        } 
    },
    
    goDown: function(currentCell) {
        if (currentCell.classList.contains('cellCurrent-left') || currentCell.classList.contains('cellCurrent-right') ) {
          currentCell.classList.remove('cellCurrent-left', 'cellCurrent-right')
          currentCell.classList.add('cellCurrent-bottom')
        } 
    },
    
    goUp: function(currentCell) {
        if (currentCell.classList.contains('cellCurrent-left') || currentCell.classList.contains('cellCurrent-right') ) {
            currentCell.classList.remove('cellCurrent-left', 'cellCurrent-right')
            currentCell.classList.add('cellCurrent-top')
        } 
    },

    eat: function (siblingCell) {
        app.points +=100
        console.log(app.points);
        document.querySelector('.points').textContent = "points : "+app.points;
        siblingCell.classList.remove('apple')
        board.randomApple();
    },
}