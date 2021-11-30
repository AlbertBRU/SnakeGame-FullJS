// looserAlert document

var looserAlert = {
    
  // Fonction gérant l'echec au jeu, determiné par plusieurs causes.
  looserAlert: function() {
    // Si le jeu est perdu, alors le serpent arrête d'avancer.
    clearInterval(intervalId)
    // On indique au joueur qu'il a perdu via une alerte.
    alert('You lose');
    // On change l'affichage du DOM dynamiquement pour afficher le meilleur score, et proposer un bouton pour relancer une partie.
    document.querySelector('.points').style.display = "none";
    document.querySelector('.tryAgain').style.display = "";
    document.querySelector('.bestScore').style.display = "";

    // Si le score que vient de faire le joueur est supérieur à son meilleur score, alors on modifie le contenu de la div bestScore.
    if(app.points >= app.bestScore) {
      app.bestScore = app.points;
      document.querySelector('.bestScore').textContent = "Your best score : " + app.bestScore;
    }
    // Enfin, on pose un écouteur d'évènement sur le bouton try again pour redéfinir le plateau de jeu au clic.
    document.querySelector('.tryAgain').addEventListener('click', board.drawBoard)
    },
}