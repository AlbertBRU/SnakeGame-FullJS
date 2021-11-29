// looserAlert document

var looserAlert = {
    
    looserAlert: function() {
        clearInterval(intervalId)
        // We put an alert to indicate the player he can't move that way anymore.
        alert('You lose');
        document.querySelector('.points').style.display = "none";
        document.querySelector('.tryAgain').style.display = "";
        document.querySelector('.bestScore').style.display = "";
    
        if(app.points >= app.bestScore) {
          app.bestScore = app.points;
          document.querySelector('.bestScore').textContent = "Your best score : " + app.bestScore;
        }
        document.querySelector('.tryAgain').addEventListener('click', board.drawBoard)
      },
}