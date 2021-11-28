// App document

var app = {

  points: 0,
  bestScore: 0,

  init: function() {
    console.log('init');

    board.drawBoard();
    document.addEventListener('keydown', app.keyDownCheck)
    document.querySelector('.start').addEventListener('click', snake.autoMove)
    document.querySelector('.bestScore').style.display = "none";
  },


  keyDownCheck: function(evt) {
    // Target the div who has the "cellCurrent" class
    const currentCell = document.querySelector('.cellCurrent');
    switch (evt.keyCode) {
      case 37:
          snake.goLeft(currentCell);
          break;
      case 38:
        snake.goUp(currentCell);
        break;
      case 39:
        snake.goRight(currentCell);
          break;
      case 40:
        snake.goDown(currentCell);
          break;
    }
    
    if(evt.key === "Enter") {
      if (document.querySelector('.start').style.display == "") {
        snake.autoMove();
        console.log('enter')
      }else if (document.querySelector('.tryAgain').style.display == "") {
        board.drawBoard();
      }
    }
    
  },
}  

document.addEventListener('DOMContentLoaded', app.init);