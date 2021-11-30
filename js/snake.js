// Snake document

var snake = {
    // De base, la longueur du serpent est définie sur 0, sa tête est orientée à droite, et il se déplace d'une case toutes les 200 milisecondes.
    snakeLength: 0,
    snakeDirection: 'right',
    speedInMs: 200,

    // Cette fonction s'active quand le jeu démarre. 
    autoMove: function() {
        // On affiche les points à la place du bouton Start.
        document.querySelector('.start').style.display = "none";
        document.querySelector('.points').style.display = "";
        // setInterval nous permet d'activer une fonction toutes les X milisecondes. C'est ce qui va donner l'illusion de mouvement au serpent.
        intervalId = setInterval(snake.moveForward, snake.speedInMs)
      },

    moveForward: function() { 
        // On doit définir la direction du serpent AVANT qu'il bouge (très important pour la suite).
        let currentDirection = snake.snakeDirection
        // la currentCell est la cellule principale, celle de la tête.
        const currentCell = document.querySelector('.cellCurrent');
        const board = document.getElementById('board');
        // Pour avoir la position actuelle du joueur, on récupère le numéro de ligne et de cellule sur lesquels est la tête
        const currentDataCell = currentCell.dataset.cell;
        const currentDataRow = currentCell.dataset.row;

        // JENKINS VEUT ALLER A DROITE ! 
        if (currentCell.classList.contains('cellCurrent-right')) {
            // On prépare le data-cell ou nous voulont aller. parseInt va transformer la string en num, permettant d'additionner 1.
            const siblingDataCell = parseInt(currentDataCell) + 1;
            // On peut selectionner la cellule sur laquelle bouger, grace au data-cell calculé plus haut.
            var siblingCell = document.querySelector('[data-row = "'+currentDataRow+'"][data-cell = "'+siblingDataCell+'"]');
            // Si la cellule de destination n'existe pas (en dehors du plateau)...
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                // On "return" pour sortir de la fonction et prévenir la disparition des autres classes.
                return;
            }else {
                // Sinon, c'est que la cellule existe, et donc on transfère les propriétés de la tête à la cellule d'a coté.
                siblingCell.classList.add('cellCurrent', 'cellCurrent-right');
                // on definit une nouvelle snakeDirection, qui n'influencera plus la "currentDirection" définie plus haut.
                // Cela nous permettra de voir si le serpent tourne, CaD si sa currentDirection("top" par ex.) est different de sa nouvelle position ('right')
                snake.snakeDirection = 'right'
            }
        }
        // JENKINS VEUT ALLER EN BAS ! 
        else if (currentCell.classList.contains('cellCurrent-bottom')) {
            // Meme principe qu'au dessus, sauf que pour un déplacement vertical, c'est le numéro de ligne qui change, et le numéro de cellule qui reste le même.
            const siblingDataRow = parseInt(currentDataRow) + 1;
            var siblingCell = document.querySelector('[data-row = "'+siblingDataRow+'"][data-cell = "'+currentDataCell+'"]');
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                return;
            }else {
            siblingCell.classList.add('cellCurrent', 'cellCurrent-bottom');
            snake.snakeDirection = 'bottom'
            }
        }
        // JENKINS VEUT ALLER A GAUCHE ! 
        else if (currentCell.classList.contains('cellCurrent-left')) {
            const siblingDataCell = parseInt(currentDataCell) - 1;
            var siblingCell = document.querySelector('[data-row = "'+currentDataRow+'"][data-cell = "'+siblingDataCell+'"]');
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                return;
            }else {
                siblingCell.classList.add('cellCurrent', 'cellCurrent-left');
                snake.snakeDirection = 'left'
            }
        }
        // JENKINS VEUT ALLER EN HAUT ! 
        else if (currentCell.classList.contains('cellCurrent-top')) {
            const siblingDataRow = parseInt(currentDataRow) - 1;
            var siblingCell = document.querySelector('[data-row = "'+siblingDataRow+'"][data-cell = "'+currentDataCell+'"]');
            if (!siblingCell || siblingCell.classList.contains('body')) {
                looserAlert.looserAlert();
                return;
            }else {
                siblingCell.classList.add('cellCurrent', 'cellCurrent-top');
                snake.snakeDirection = 'top'
            }
        }
        // On stocke la direction du serpent après le mouvement dans une nouvelle variable.
        let newDirection = snake.snakeDirection
        // On appelle la fonction qui définit le corps du serpent et on lui donne : La position de la tête + son orientation initiale + son orientation finale.
        snake.setBody(currentCell,currentDirection, newDirection);
        // Dans tous les cas (de succès), on enlève les classes cellCurrent, qui détermine la tête (qui a bougé vers une cellule voisine)
        currentCell.classList.remove('cellCurrent', 'cellCurrent-right', 'cellCurrent-bottom', 'cellCurrent-left', 'cellCurrent-top');
        // Si la cellule voisine contient une pomme, alors on envoie la fonction eat.
        if (siblingCell.classList.contains('apple')) {
            snake.eat(siblingCell);
        }
    },

    // Ces fonctions attachés aux écouteurs des touches directionnelles changent l'orientation de la tête du serpent, élément clé du mouvement de moveForward.
    // Si la tête est à la verticale (haut / bas), elle ne pourra qu'aller à droite ou a gauche. Inversement, si elle est a l'horizontale, cela lui permettra d'aller uniquement en haut ou en bas. Ce qui fait qu'il ne sera pas possible de passer directement de droite à gauche (un glitch permet de faire demi-tour en appuyant rapidement pour passer de haut a gauche, puis de gauche à bas, avant la fin de l'intervale de temps gérant le mouvement. Glitch très risqué car vous mourrez si vous croquez votre corps!)
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
        // Si le serpent mange une pomme, le joueur gagne 100pts
        app.points +=100
        document.querySelector('.points').textContent = "points : "+app.points;
        // On enlève donc la pomme et on en replace une a un autre endroit.
        siblingCell.classList.remove('apple')
        board.randomApple();
        // On fait également grandir le serpent de 1.
        snake.snakeLength +=1;
    },
    

    setBody: function (currentCell,currentDirection, newDirection) {
        // Si le serpent à mangé une pomme et donc grandis, alors on rajoute à chaque cellule par laquelle il passe les classes body et tail. 
        // .tail est plus haut dans le CSS et ne sera donc pas affiché tant que le body est présent. On va gérer également l'orientation de la queue et du corps.
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

            // Cette boucle permet de comprendre si le joueur à tourné durant l'intervale. Si il à tourné, la cellule sur laquelle il était au début de l'intervalle devient donc un "coude" du serpent, CaD une jonction fluide de son corps de la verticale à l'horizontale et inversement.
            // Les classes turnXtY sont des notations pour orienter la jonction voulant dire "turn X to Y". X représente l'orientation de base, Y l'orientation finale.
            // Donc "B" c'est Bottom, "T" pour top, "L" pour left, "R" veut dire Right et "t", c'est "to". 
            // turnBtR-LtT veut donc dire "turn Bottom to Right or Left to Top" (c'est la même rotation). 
            if (currentDirection =='left' && snake.snakeLength > 1) {
                if (newDirection == 'top') {
                    currentCell.classList.add('turnTheSnake', 'turnBtR-LtT')
                }else if (newDirection == 'bottom') {
                    currentCell.classList.remove('body-left','tail-left') 
                    currentCell.classList.add('turnTheSnake')
                }
            } else if (currentDirection =='right' && snake.snakeLength > 1) {
                if (newDirection == 'top') {
                    currentCell.classList.add('turnTheSnake', 'turnRtT-BtL')
                }else if (newDirection == 'bottom') {
                    currentCell.classList.add('turnTheSnake', 'turnRtB-TtL')
                }
            } else if (currentDirection =='top' && snake.snakeLength > 1) {
                if (newDirection == 'left') {
                    currentCell.classList.add('turnTheSnake', 'turnRtB-TtL')
                }else if (newDirection == 'right') {
                    currentCell.classList.add('turnTheSnake')
                }
            } else if (currentDirection =='bottom' && snake.snakeLength > 1) {
                if (newDirection == 'left') {
                    currentCell.classList.add('turnTheSnake', 'turnRtT-BtL')
                }else if (newDirection == 'right') {
                    currentCell.classList.add('turnTheSnake', 'turnBtR-LtT')
                }
            }

            // On retire la propriété body à une intervale de moins que la longueur du serpent. La dernière intervale servira à afficher la queue.
            // Si Jenkins à mangé 3 pommes, snakeLength sera égal à 3. Il faudra donc garder chaque cellule de corps pendant 2 intervales, et à la troisième, une fois les propriétés de body retirées, c'est la queue qui prendra le relais.
            let timeToRemoveBody = snake.snakeLength*snake.speedInMs -snake.speedInMs;
            window.setTimeout(function() {            
            currentCell.classList.remove('body', 'body-bottom', 'body-right', 'body-top', 'body-left','turnTheSnake', 'turnRtB-TtL', 'turnRtT-BtL', 'turnBtR-LtT');
            }, timeToRemoveBody);
            // On retire la queue apres la dernière intervale, pour que la queue sonnante de notre serpent soit toujours visible! 
            let timeToRemoveTail = snake.snakeLength*snake.speedInMs;
            window.setTimeout(function() {            
            currentCell.classList.remove('tail', 'tail-bottom', 'tail-right', 'tail-top', 'tail-left');
            }, timeToRemoveTail);
        }
    }
}