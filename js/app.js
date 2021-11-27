// App document

var app = {

  init: function() {
    console.log('init');

    app.drawBoard();
  },

  drawBoard:function () {
    // target the div with id board to insert our rows
    const board = document.getElementById('board')
    console.log(board)

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
  }

}  

document.addEventListener('DOMContentLoaded', app.init);