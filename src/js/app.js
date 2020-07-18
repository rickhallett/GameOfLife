// (function ($) {
//   'use strict';
// }(jQuery));

(function() {
    var _ = self.Life = function(seed) {
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;

        this.prevBoard = [];
        this.board = cloneArray(seed);
    };

    _.prototype = {
        next() {
            this.prevBoard = cloneArray(this.board);
            let shitBoard = this.board.slice();

            //debugger;

            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let neighbours = this.aliveNeighbours(x, y, this.prevBoard);
                    let isAlive = !!this.board[y][x];

                    if (isAlive) { 
                        if (neighbours < 2 || neighbours > 3) {
                            this.board[y][x] = 0;
                        }
                    } else {
                        if (neighbours == 3) {
                            this.board[y][x] = 1;
                        }
                    }
                }
            }
        },

        aliveNeighbours(x, y, array) {
            let prevRow = array[y - 1] || [];
            let thisRow = array[y];
            let nextRow = array[y + 1] || [];

            let left = x - 1;
            let right = x + 1;

            return [
                prevRow[left], prevRow[x], prevRow[right],
                thisRow[left],             thisRow[right],
                nextRow[left], nextRow[x], nextRow[right]
            ].reduce(function(prev, curr) {
                return prev + +!!curr; // where s is 0, -1 or undefined, add 0. if 1, add 1.
            }, 0);
        },

        toString: function() {
            return this.board.map(function(row) { return row.join(' '); }).join('\n');
        }
        
    };

    //helpers
    function cloneArray(array) {
        return array.slice().map(row => row.slice());
    }
   
})();


//setup

let game = new Life([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]);

(function() {
    let _ = self.LifeView = function(table, size) {
        this.grid = table;
        this.size = size;
        this.checkboxes = [];

        this.createGrid();
    };

    _.prototype = {
        createGrid: function() {
            //debugger;
            let fragment = document.createDocumentFragment();
            this.grid.innerHTML = ''

            for (let y = 0; y < this.size; y++) {
                let row = document.createElement('tr');
                this.checkboxes[y] = [];
                
                for (let x = 0; x < this.size; x++) {
                    let cell = document.createElement('td');
                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox'
                    this.checkboxes[y][x] = checkbox;

                    cell.appendChild(checkbox);
                    row.appendChild(cell);
                }

                fragment.appendChild(row);
                
            }

            this.grid.appendChild(fragment);
        },

        renderGrid: function() {
            let gridView = document.getElementById('grid');
            //gridView.appendChild(this.grid);
        }
    };
})();

let lifeView = new LifeView(document.getElementById('grid'), 12);


