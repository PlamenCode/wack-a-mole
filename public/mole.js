let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let isClicked = false;

let moleTime = 1000;
let plantTime = 2000;


let easyBtn = document.getElementsByClassName('easy-btn');
    easyBtn[0].addEventListener('click', () => {
        moleTime = 2000;
        plantTime = 3000;

        easyBtn[0].classList = 'level-btn easy-btn selected';
        normalBtn[0].classList = 'level-btn easy-btn';
        hardBtn[0].classList = 'level-btn easy-btn';
    })

let normalBtn = document.getElementsByClassName('normal-btn');
    normalBtn[0].addEventListener('click', () => {
        moleTime = 1000;
        plantTime = 2000;

        easyBtn[0].classList = 'level-btn easy-btn';
        normalBtn[0].classList = 'level-btn easy-btn selected';
        hardBtn[0].classList = 'level-btn easy-btn';
    })

let hardBtn = document.getElementsByClassName('hard-btn');
    hardBtn[0].addEventListener('click', () => {
        moleTime = 500;
        plantTime = 1000;

        easyBtn[0].classList = 'level-btn easy-btn';
        normalBtn[0].classList = 'level-btn easy-btn';
        hardBtn[0].classList = 'level-btn easy-btn selected';
    })

let board = document.getElementById('board');
let restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', restart);

let startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => { setGame() });


function setGame(){
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        board.appendChild(tile);
    };
    restartBtn.style.display = 'none';
    startBtn.style.display = 'none';

    window.moleInterval = setInterval(setMole, moleTime);
    window.plantInterval = setInterval(setPlant, plantTime);

};

function restart(){
    score = 0;
    gameOver = false;
    board.innerHTML = '';
    clearInterval(window.moleInterval);
    clearInterval(window.plantInterval);
    setGame();
};

function getRnadomTile(){
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

    let num = getRnadomTile();
    if(currentPlantTile && currentPlantTile.id == num) return;

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole)
    isClicked = false;
};

function setPlant(){
    if(gameOver) return;

    if(currentPlantTile){
        currentPlantTile.innerHTML = '';
    }

    let plant = document.createElement('img');
    plant.src = './assets/piranha-plant.png';

    let num = getRnadomTile();
    if(currentMoleTile && currentMoleTile.id == num) return;

    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant)
};

function selectTile(){
    if(gameOver) return;

    if(this == currentMoleTile && !isClicked){
        score += 10;
        document.getElementById('score').innerText = score.toString();
        currentMoleTile.innerHTML = '';
        isClicked = true;
    } else if (this == currentPlantTile){
        document.getElementById('score').innerText = `Game Over: ${score.toString()}`;
        restartBtn.style.display = 'block';
        gameOver = true;
    }
};