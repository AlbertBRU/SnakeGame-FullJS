// Board loader document

var board = {

    // Fonction qui va créer le plateau de jeu.
    drawBoard:function () {
        // A chaque nouveau plateau, on réinitialise le compteur de points.
        app.points = 0,
        // On affiche le bouton start, on fait disparaitre le bouton des points, on rajoute le nombre de points dans la div cachée en prévision du lancement du jeu, et on cache le bouton "tryAgain".
        document.querySelector('.start').style.display = "";
        document.querySelector('.points').style.display = "none";
        document.querySelector('.points').textContent = "points : " + app.points;
        document.querySelector('.tryAgain').style.display = "none";
    
        // On cible la div avec l'id Board pour insérer nos lignes du plateau de jeu et on la vide pour repartir sur un nouveau plateau à chaque appel de la fonction
        const boardDiv = document.getElementById('board')
        boardDiv.innerHTML="";
    
        // On créé chaque ligne, pour 20 ligne au total. Le compte de la boucle for commence à 1 pour avoir des dataset plus harmonieux.
        for (let row = 1; row < 21; row++) {
            cellRow = document.createElement('div');
            cellRow.classList.add('cellRow');
            // on créé pour chaque ligne un id (rowX) indiquant le numéro de ligne.
            cellRow.id = 'row'+ row ;
            // On insère cette ligne dans notre tableau
            boardDiv.append(cellRow);
            // Pour chaque ligne créée, on vient créer autant de cellule par ligne qu'il y a de ligne, pour obtenir un carré.
            for (let cell = 1; cell < 21; cell++) {
                cellToInsert = document.createElement('div');
                cellToInsert.classList.add('cell');
                // chaque cell aura un data-row correspondant au numéro de sa ligne, et un data-cell correspondant à sa position sur la ligne.
                cellToInsert.dataset.row = row;
                cellToInsert.dataset.cell = cell;
                // Et pour finir, on insère ces cellules fraichement créées dans notre ligne, avant que la boucle ne reprenne la création de la ligne suivante.
                cellRow.append(cellToInsert)
            }
        }
        // On appelle la fonction permettant de rendre aléatoire l'apparition du serpent en début de jeu.
        board.randomStartSnake();
        // Le serpent n'a pas de "longueur" au début du jeu.
        snake.snakeLength = 0;
        // On appelle la fonction disposant la première pomme sur le plateau.
        board.randomApple();
    },

    randomNumberGenerator: function() {
        const boardDiv = document.getElementById('board')
        // Compte le nombre de lignes sur la board
        const RowAndCellLenght = boardDiv.querySelectorAll('.cellRow').length
        // Définit un nombre aléatoire positif inferieur ou égal au nombre de lignes / cellule du plateau.
        const randomPos = Math.floor(Math.random() * RowAndCellLenght +1);
        return randomPos
    },

    randomStartSnake: function() {
        // On fait marcher deux fois la fonction générant un nombre aléatoire pour positionner le serpent
        const randomDataRowStart = board.randomNumberGenerator();
        const randomDataCellStart = board.randomNumberGenerator();
        // Avec ces deux nombres aléatoires, cela nous donne une position de départ pour notre serpent
        const startingCell = document.querySelector('[data-row = "'+randomDataRowStart+'"][data-cell = "'+randomDataCellStart+'"]');
        // On ajoute les classes à la nouvelle cellule selectionnée pour afficher la tête
        startingCell.classList.add('cellStart', 'cellCurrent', 'cellCurrent-right')
    },
    
    randomApple: function() {
        // Même principe pour la pomme.
        const randomDataRowApple = board.randomNumberGenerator();
        const randomDataCellApple = board.randomNumberGenerator();
        const apple = document.querySelector('[data-row = "'+randomDataRowApple+'"][data-cell = "'+randomDataCellApple+'"]');
        // Si l'emplacement de la pomme est le même que la tête ou le corps, alors on relance la fonction jusqu'à ce que ce ne soit plus le cas.
        if(apple.classList.contains('body') || apple.classList.contains('cellCurrent')) {
            board.randomApple();
        }else {
            // Une fois que l'endroit choisi est disponible, on affiche une pomme.
            apple.classList.add('apple')
        }
    },
}
