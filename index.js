const gameContainer = document.getElementById('game-container');
const colourButton = document.getElementById('select-ink');
const gridSizeSlider = document.getElementById('grid-size');
const gridSizeLabel = document.getElementById('grid-size-label');

const INITIAL_GRID = 8;
let gridSize = 8;
gameContainer.style.gridTemplateRows = `repeat(${gridSize}, ${40/gridSize}vw)`
gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${40/gridSize}vw`
let colourSelected = 'bisque';
let rainbowArray = ['red', 'orange', 'yellow', 
                    'green', 'blue', 'indigo', 'violet']
let rainbow = false;
createGrid(INITIAL_GRID * INITIAL_GRID);
colourTiles(colourSelected);

gridSizeSlider.addEventListener('change', () => {
    let value = gridSizeSlider.value
    createGrid(value*value);
    gameContainer.style.gridTemplateRows = `repeat(${value}, ${40/value}vh)`
    gameContainer.style.gridTemplateColumns = `repeat(${value}, ${40/value}vh`
    colourTiles(colourSelected);
    gridSizeLabel.textContent = `Grid size: ${gridSizeSlider.value} x ${gridSizeSlider.value}`;
})

// Creating the tiles for etch-a-sketch
function createGrid(pixels) {
    gameContainer.innerHTML = '';
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
// Clear the game grid
function clearGrid() {
    const tiles = document.querySelectorAll('.game-tile');
    console.log(tiles);
    tiles.forEach(tile => {
        tile.style.backgroundColor = 'white';
    });
}
// White ink 
function eraser() {
    rainbow = false;
    colourTiles('white');
}
// Black ink
function blackenPen() {
    rainbow = false;
    colourTiles('black');
}
// Random colour (based on the rainbow array)
function rainbowPen() {
    rainbow = true;
}
// Select a colour
function selectColourPen() {
    rainbow = false;
    console.log(colourButton.value);
    colourTiles(`${colourButton.value}`);
}
// Produces a random number for rainbow ink
function randomNumber() {
    let randomNumber = Math.floor(Math.random() * 7)
    return randomNumber;
}