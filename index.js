const gameContainer = document.getElementById('game-container');
const colourButton = document.getElementById('select-ink');

let gridSize = 8;
gameContainer.style.gridTemplateRows = `repeat(${gridSize}, ${50/gridSize}vh)`
gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${50/gridSize}vh`
let colourSelected = 'lightgreen';
let rainbowArray = ['red', 'orange', 'yellow', 
                    'green', 'blue', 'indigo', 'violet']
let rainbow = false;
createGrid(gridSize * gridSize);
colourTiles(colourSelected);

// Creating the tiles for etch-a-sketch
function createGrid(pixels) {
    for (let i = 0; i < pixels; i++) {
        const gameTile = document.createElement('div');
        gameTile.classList.add('game-tile');
        gameContainer.appendChild(gameTile);
    }
}

// Allow the user to colour the tiles by using the mouse
function colourTiles(colourSelected) {
    let drawing = false;
    window.onmouseup = () => {
        drawing = false;
    }
    window.onmousedown = () => {
        drawing = true;
    }
    const tiles = document.querySelectorAll('.game-tile');
    tiles.forEach(tile => {
        tile.addEventListener('mouseover', () => {
            if (drawing) {
            tile.style.backgroundColor = colourSelected;
            if (rainbow) {
                tile.style.backgroundColor = rainbowArray[randomNumber()]
            }
            }
        })
        tile.addEventListener('mousedown', () => {
            tile.style.backgroundColor = colourSelected;
            if (rainbow) {
                tile.style.backgroundColor = rainbowArray[randomNumber()]
            }
        })
    })
}

function clearGrid() {
    const tiles = document.querySelectorAll('.game-tile');
    console.log(tiles);
    tiles.forEach(tile => {
        tile.style.backgroundColor = 'white';
    });
}

function eraser() {
    rainbow = false;
    colourTiles('white');
}

function blackenPen() {
    rainbow = false;
    colourTiles('black');
}

function rainbowPen() {
    rainbow = true;
}
function randomNumber() {
    let randomNumber = Math.floor(Math.random() * 7)
    return randomNumber;
}