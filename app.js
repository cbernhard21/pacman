const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
scoreDisplay.innerText = 0;
let squares = [];
let score = 0;
const gameOver = 'Game Over';

//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

//create board
function createBoard() {
    
    for (let i = 0; i < layout.length; i++) {

        const square = document.createElement('div');
        grid.appendChild(square);

        //put the square div in new array
        squares.push(square);

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        }else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair') 
        }else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        }
    }
}

createBoard();

//starting position of pacman
let pacmanCurrentIndex = 490;

let x = squares[pacmanCurrentIndex].classList.add('pacman');

//move pacman
function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman');

    switch (e.keyCode) {
        case 40:
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('wall') && 
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex + width < width * width
                )
                
                pacmanCurrentIndex += width;
    
            break;

        case 38:
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('wall') && 
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex - width >= 0
                )
                pacmanCurrentIndex -= width;   
                
            break;

        case 39:
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                pacmanCurrentIndex % width < width - 1
                )      
                pacmanCurrentIndex += 1;
                if (pacmanCurrentIndex === 391){
                    pacmanCurrentIndex = 364;
                }
           
            break;

        case 37:
            if (
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') && 
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                pacmanCurrentIndex % width !== 0
                )
                pacmanCurrentIndex -= 1;
                if (pacmanCurrentIndex === 364){
                    pacmanCurrentIndex = 391;
                }
                break;
                
    }
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
    checkForGameOver();
}


document.addEventListener('keyup', control);

//eat pellet and keep score
function pacDotEaten(){
    // eat pac-dot 
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score += 10;
        scoreDisplay.innerText = score;
    }
}


function powerPelletEaten() {
    //if square pacman is in contains power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        //add score of 100
        score += 100;
        scoreDisplay.innerText = score;
        //remove power pellet
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        //change each ghost to isScared
        ghosts.forEach(ghost => ghost.isScared = true);

        //use setTimeout to unscare ghosts after 10 seconds
        setTimeout(unScareGhost, 10000)
    }   
}

function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false);
}


class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost ('blink', 348, 250),
    new Ghost ('pinky', 376, 400),
    new Ghost ('inky', 351, 300),
    new Ghost ('clyde', 379, 500)
];

//draw my ghost onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});

//move each ghost
ghosts.forEach(ghost => moveGhosts(ghost));

function moveGhosts(ghost){
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    
    ghost.timerId = setInterval(function() {
      
      if (
          !squares[ghost.currentIndex + direction].classList.contains('wall') &&
          !squares[ghost.currentIndex + direction].classList.contains('ghost', 'scard-ghost')
          ){
        //remove ghost class
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        //add current direction to current index
        ghost.currentIndex += direction;
        //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
      } else direction = directions[Math.floor(Math.random() * directions.length)]
      
      
      //if the ghost is currently scared
      if (ghost.isScared) {
          squares[ghost.currentIndex].classList.add('scared-ghost');
      }
      
      //if the ghost is current scared AND pacman is on it
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){
      //remove classname = ghost.className, 'ghost', 'scared-ghost'
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
      
      //change ghosts currentIndex back to its startIndex
      ghost.currentIndex = ghost.startIndex;
      
      //add score of 150points
      score += 150;
      scoreDisplay.innerText = score;
            
      //add classnames = ghost.className, 'ghost', 'scared-ghost'
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      }     
      checkForGameOver();
    }, ghost.speed)   
}


//check for game over
function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
        
        ){
            //for each ghost - we need to stop it moving
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            
            //remove eventlistener from our control function
            document.removeEventListener('keyup', control) 
            
            //tell the user the game is over
            scoreDisplay.innerHTML = 'Game Over';       
    }

}

function checkForWin(){
    if(score === 2500) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        //remove the eventListener for the control function
        document.removeEventListener('keyup', control)   
        //tell user they won
        scoreDisplay.innerHTML = 'You win!';
    }     
}
