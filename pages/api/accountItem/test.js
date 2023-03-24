//Conways game of life
let grid = [ 
    -1, -1 ,-1 ,-1,
    -1, -1 ,-1 ,-1,
    -1, -1 ,-1 ,-1,
    -1, -1 ,-1 ,-1,
]

let gridObject = {
    0: 0,
}

const size = 4;
const flipCell = (x,y) => {
    const row = x * 4;
    const column = y;
    const index = row + column;
    grid[index] *= -1;
    return grid;
}

flipCell(1,1);
flipCell(1,2);
flipCell(2,1);
flipCell(2,2);

const countLiveNeighbors = (grid,x,y) => {
    // current cell = x,y
    // define neighbors - NW , N , NE
    // return number of live neighbors
}

const getNextGeneration = (grid) => {
    let newGrid = [...grid];
    // iterate over each cell in grid
    grid.forEach((cell,index) => {
        // define neighbors of cell
        // count live neighbors
        countLiveNeighbors();
        // check our 4 conditions
            // flip cell dead or alive in new grid
    })

    return newGrid;
}