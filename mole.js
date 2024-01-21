let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;  

let board = document.getElementById('board');
let restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', restart);


window.onload = function(){
    setGame();
};


function setGame(){
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        board.appendChild(tile);
    };
    restartBtn.style.display = 'none';

    window.moleInterval = setInterval(setMole, 500);
    window.plantInterval = setInterval(setPlant, 1000);

};

function restart(){
    score = 0;
    gameOver = false;
    board.innerHTML = '';
    clearInterval(window.moleInterval);
    clearInterval(window.plantInterval);
    setGame();
};

function getRnadomTime(){
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){
    if(gameOver) return;

    if(currentMoleTile){
        currentMoleTile.innerHTML = '';
    }

    let mole = document.createElement('img');
    mole.src = './assets/monty-mole.png'

    let num = getRnadomTime();
    if(currentPlantTile && currentPlantTile.id == num) return;

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole)
};

function setPlant(){
    if(gameOver) return;

    if(currentPlantTile){
        currentPlantTile.innerHTML = '';
    }

    let plant = document.createElement('img');
    plant.src = './assets/piranha-plant.png';

    let num = getRnadomTime();
    if(currentMoleTile && currentMoleTile.id == num) return;

    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant)
};

function selectTile(){
    if(gameOver) return;

    if(this == currentMoleTile){
        score += 10;
        document.getElementById('score').innerText = score.toString();
    } else if (this == currentPlantTile){
        document.getElementById('score').innerText = `Game Over: ${score.toString()}`;
        restartBtn.style.display = 'block';
        gameOver = true;
    }
};