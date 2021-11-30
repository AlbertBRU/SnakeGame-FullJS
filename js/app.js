// App document

var app = {

  // On commence le jeu avec 0 points au compteur, et au rechargement de la page, 0 points au "Best Score" (meilleur score)
  points: 0,
  bestScore: 0,

  // Fonction d'initialisation du jeu. Elle gère tous les évènements devant se produire dès le chargement de la page.
  init: function() {
    console.log('init');
    // On appelle la fonction drawBoard qui va construire le plateau sur lequel évolue le serpent.
    board.drawBoard();
    // On pose l'écouteur d'évènements sur les touches directionnelles du clavier et la touche entrée pour lancer le jeu.
    document.addEventListener('keydown', app.keyDownCheck)
    // On pose l'écouteur d'évènements sur clic du bouton start
    document.querySelector('.start').addEventListener('click', snake.autoMove)
    // On fait disparaitre l'affichage du best Score, qui ne sera rendu visible qu'une fois la première partie terminée.
    document.querySelector('.bestScore').style.display = "none";
  },


  keyDownCheck: function(evt) {
    // On cible la div ayant la class "cellCurrent" (la tête du serpent) pour la donner en argument des fonctions de direction.
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
    // Si la touche Entrée est pressée, alors...
    if(evt.key === "Enter") {
      // ... la fonction autoMove, qui fait bouger le serpent, s'active si le bouton start est affiché à l'écran.
      if (document.querySelector('.start').style.display == "") {
        snake.autoMove();
      }
      // ... on renvoie un plateau de jeu si c'est "try again" qui est à l'écran
      else if (document.querySelector('.tryAgain').style.display == "") {
        board.drawBoard();
      }
    }
    
  },
}  
// On appelle l'initialisation des fonctions JS une fois le DOM chargé.
document.addEventListener('DOMContentLoaded', app.init);