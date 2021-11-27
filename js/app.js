// App document

var app = {

  winGame: false,

  points: 0,
  bestScore: 0,

  init: function() {
    console.log('init');

    app.drawBoard();
    document.addEventListener('keydown', app.keyDownCheck)
    document.querySelector('.start').addEventListener('click', app.autoMove)
    document.querySelector('.bestScore').style.display = "none";
  },

  drawBoard:function () {
    points = 0,
    document.querySelector('.start').style.display = "";
    document.querySelector('.points').style.display = "none";
    document.querySelector('.points').textContent = "points : ";
    document.querySelector('.tryAgain').style.display = "none";

    // target the div with id board to insert our rows
    const board = document.getElementById('board')
    board.innerHTML="";

    for (let row = 1; row < 21; row++) {
      cellRow = document.createElement('div');
      cellRow.classList.add('cellRow');
      cellRow.id = 'row'+ row ;
      board.append(cellRow);
      // Once a raw is created, fill it with 6 cells
      for (let cell = 1; cell < 21; cell++) {
        cellToInsert = document.createElement('div');
        cellToInsert.classList.add('cell');
        cellToInsert.dataset.row = row;
        cellToInsert.dataset.cell = cell;
        cellRow.append(cellToInsert)
      }
    }
    app.randomStartSnake();
    app.randomApple();
  },

  randomNumberGenerator: function() {
    // Count the number of rows in the board
    const RowAndCellLenght = board.querySelectorAll('.cellRow').length
    const randomPos = Math.floor(Math.random() * RowAndCellLenght +1);
    return randomPos
  },

  randomStartSnake: function() {
    const randomDataRowStart = app.randomNumberGenerator();
    const randomDataCellStart = app.randomNumberGenerator();
    // Get the new starting cell according to the random generated numbers
    const startingCell = document.querySelector('[data-row = "'+randomDataRowStart+'"][data-cell = "'+randomDataCellStart+'"]');
    // Add the classes to the new random selected cell
    startingCell.classList.add('cellStart', 'cellCurrent', 'cellCurrent-right')
  },
  
  randomApple: function() {
    const randomDataRowApple = app.randomNumberGenerator();
    const randomDataCellApple = app.randomNumberGenerator();
    // Get the new starting cell according to the random generated numbers
    const apple = document.querySelector('[data-row = "'+randomDataRowApple+'"][data-cell = "'+randomDataCellApple+'"]');
    // Add the classes to the new random selected cell
    apple.classList.add('apple')
  },

  keyDownCheck: function(evt) {
    // Target the div who has the "cellCurrent" class
    const currentCell = document.querySelector('.cellCurrent');
    switch (evt.keyCode) {
      case 37:
          app.goLeft(currentCell);
          break;
      case 38:
        app.goUp(currentCell);
        break;
      case 39:
        app.goRight(currentCell);
          break;
      case 40:
        app.goDown(currentCell);
          break;
    }
    // document.querySelector('.start').style.display = "";
    // document.querySelector('.points').style.display = "none";
    // document.querySelector('.points').textContent = "points : ";
    // document.querySelector('.tryAgain').style.display = "none";
    
    if(evt.key === "Enter") {
      if (document.querySelector('.start').style.display == "") {
        app.autoMove();
        console.log('enter')
      }else if (document.querySelector('.tryAgain').style.display == "") {
        app.drawBoard();
      }
    }
    
  },

  autoMove: function() {
    document.querySelector('.start').style.display = "none";
    document.querySelector('.points').style.display = "";
    document.querySelector('.points').textContent += app.points;

    intervalId = setInterval(app.moveForward, 200)
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
        app.looserAlert();
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
        app.looserAlert();
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
        app.looserAlert();
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
        app.looserAlert();
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
      app.eat(siblingCell);
    }
    // if siblingCell contains -> snake part
      // app.bite() -> LooserAlert
    console.log(siblingCell);
  },

  eat: function (siblingCell) {
    app.points +=100
    console.log(app.points);
    document.querySelector('.points').textContent = "points : "+app.points;
    siblingCell.classList.remove('apple')
    app.randomApple();
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

  looserAlert: function() {
    clearInterval(intervalId)
    // We put an alert to indicate the player he can't move that way anymore.
    alert('You loose');
    document.querySelector('.points').style.display = "none";
    document.querySelector('.tryAgain').style.display = "";
    document.querySelector('.bestScore').style.display = "";

    if(app.points >= app.bestScore) {
      app.bestScore = app.points;
      document.querySelector('.bestScore').textContent = "Your best score : " + app.bestScore;
    }
    document.querySelector('.tryAgain').addEventListener('click', app.drawBoard)
  },


}  

document.addEventListener('DOMContentLoaded', app.init);