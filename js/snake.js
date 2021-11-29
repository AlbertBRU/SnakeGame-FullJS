// Snake document

var snake = {

    snakeLength: 0,
    snakeDirection: 'right',
    speedInMs: 500,

    autoMove: function() {
        document.querySelector('.start').style.display = "none";
        document.querySelector('.points').style.display = "";
    
        intervalId = setInterval(snake.moveForward, snake.speedInMs)
      },

    moveForward: function() { 
        // console.log(snake.snakeDirection);
        let currentDirection = snake.snakeDirection

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
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                // we return to exit the function and prevent all classes to disapear!
                return;
            }else {
                // We change the classes to match the move
                siblingCell.classList.add('cellCurrent', 'cellCurrent-right');
                snake.snakeDirection = 'right'
            }
        }
        // MY MAN WANT TO GO TO THE BOTTOM ! 
        else if (currentCell.classList.contains('cellCurrent-bottom')) {
            const siblingDataRow = parseInt(currentDataRow) + 1;
            var siblingCell = document.querySelector('[data-row = "'+siblingDataRow+'"][data-cell = "'+currentDataCell+'"]');
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                // we return to exit the function and prevent all classes to disapear!
                return;
            }else {
            siblingCell.classList.add('cellCurrent', 'cellCurrent-bottom');
            snake.snakeDirection = 'bottom'
            }
        }
        // MY MAN WANT TO GO TO THE LEFT ! <=
        else if (currentCell.classList.contains('cellCurrent-left')) {
            const siblingDataCell = parseInt(currentDataCell) - 1;
            var siblingCell = document.querySelector('[data-row = "'+currentDataRow+'"][data-cell = "'+siblingDataCell+'"]');
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                // we return to exit the function and prevent all classes to disapear!
                return;
            }else {
                siblingCell.classList.add('cellCurrent', 'cellCurrent-left');
                snake.snakeDirection = 'left'
            }
        }
        // MY MAN WANT TO GO TO THE TOP ! 
        else if (currentCell.classList.contains('cellCurrent-top')) {
            const siblingDataRow = parseInt(currentDataRow) - 1;
            var siblingCell = document.querySelector('[data-row = "'+siblingDataRow+'"][data-cell = "'+currentDataCell+'"]');
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                // we return to exit the function and prevent all classes to disapear!
                return;
            }else {
                siblingCell.classList.add('cellCurrent', 'cellCurrent-top');
                snake.snakeDirection = 'top'
            }
        }
        let newDirection = snake.snakeDirection
        snake.setBody(currentCell,currentDirection, newDirection);

        // In any success case, we will remove the classes cellCurrent, because we move, and the position of the cursor attached to the current cell class.
        currentCell.classList.remove('cellCurrent', 'cellCurrent-right', 'cellCurrent-bottom', 'cellCurrent-left', 'cellCurrent-top');
      
        if (siblingCell.classList.contains('apple')) {
            snake.eat(siblingCell);
        }
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
        snake.snakeLength +=1;
    },
    
    setBody: function (currentCell,currentDirection, newDirection) {
     console.log(currentDirection);
     console.log(newDirection);
        if (snake.snakeLength > 0) {
            currentCell.classList.add('body', 'tail');
            if (currentCell.classList.contains('cellCurrent-left')){
                currentCell.classList.add('body-left','tail-left') 
            }
            else if (currentCell.classList.contains('cellCurrent-top')){
                currentCell.classList.add('body-top','tail-top')
            }
            else if (currentCell.classList.contains('cellCurrent-right')){
                currentCell.classList.add('body-right','tail-right')
            }
            else if (currentCell.classList.contains('cellCurrent-bottom')){
                currentCell.classList.add('body-bottom','tail-bottom')
            }

            if (currentDirection =='left' && snake.snakeLength > 1) {
                if (newDirection == 'top') {
                    currentCell.classList.add('turnTheSnake', 'turn-left-top')
                }else if (newDirection == 'bottom') {
                    currentCell.classList.add('turnTheSnake')
                }
            } else if (currentDirection =='right' && snake.snakeLength > 1) {
                if (newDirection == 'top') {
                    currentCell.classList.add('turnTheSnake', 'turn-right-top')
                }else if (newDirection == 'bottom') {
                    currentCell.classList.add('turnTheSnake', 'turn-right-bottom')
                }
            } else if (currentDirection =='top' && snake.snakeLength > 1) {
                if (newDirection == 'left') {
                    currentCell.classList.add('turnTheSnake', 'turn-top-left')
                }else if (newDirection == 'right') {
                    currentCell.classList.add('turnTheSnake')
                }
            } else if (currentDirection =='bottom' && snake.snakeLength > 1) {
                if (newDirection == 'left') {
                    currentCell.classList.add('turnTheSnake', 'turn-bot-left')
                }else if (newDirection == 'right') {
                    currentCell.classList.add('turnTheSnake', 'turn-bot-right')
                }
            }



            let timeToRemoveBody = snake.snakeLength*snake.speedInMs -snake.speedInMs;
            window.setTimeout(function() {            
            currentCell.classList.remove('body', 'body-bottom', 'body-right', 'body-top', 'body-left','turnTheSnake', 'turn-left-top', 'turn-right-top', 'turn-right-bottom', 'turn-top-left', 'turn-bot-left', 'turn-bot-right' );
            }, timeToRemoveBody);

            let timeToRemoveTail = snake.snakeLength*snake.speedInMs;
            window.setTimeout(function() {            
            currentCell.classList.remove('tail', 'tail-bottom', 'tail-right', 'tail-top', 'tail-left');
            }, timeToRemoveTail);
        }
    }
}