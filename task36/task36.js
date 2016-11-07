/*eslint max-len: 'off' */
var Grid = {

  /***************** Models **************/
  xPoint: 5,
  yPoint: 5, // first grid in [5,5]
  headDir: [], // store the head direction
  wallGridArr: [], // store all the wall grid coordinates

  init: function functionName() {
    let initGrid = Grid.getCurrentGrid();
    initGrid.innerHTML = '<span class="top"></span>';
    initGrid.id = 'gridmark';
  },

  /**
  * Init grid array with grid node
  * @return {Array}
  */
  initGridArray: function() {
    // Init grid array with GridNode
    let grid = [];

    for (let x = 0; x < 11; x++) {
      grid[x] = [];
      for (let y = 0; y < 11; y++) {
        grid[x][y] = Grid.getGrid(x, y);
      }
    }

    // Exclude grid[0][y] and grid[x][0]
    for (let i = 0; i < 11; i++) {
      grid[i][0].className = 'wall';
      grid[i][0].style.background = '#fff';
      grid[0][i].className = 'wall';
      grid[0][i].style.background = '#fff';
    }

    return grid;
  },

  /************* Controllers *************/

  /**
   * Move current grid on the board
   * @param  {string} dir {Direction to move}
   */
  moveGrid: function(dir) {
    dir = dir || Grid.getCurrentDir();
    Grid.headDir.push(Grid.getCurrentDir());

    if (dir.includes('right')) {
      if (Grid.yPoint < 10 && !Grid.isWall(Grid.xPoint, Grid.yPoint + 1)) {
        Grid.clearGrid(Grid.xPoint, Grid.yPoint);
        Grid.yPoint += 1;
      } else {
        console.log('there is wall');
      }
    }

    if (dir.includes('bottom')) {
      if (Grid.xPoint < 10 && !Grid.isWall(Grid.xPoint + 1, Grid.yPoint)) {
        Grid.clearGrid(Grid.xPoint, Grid.yPoint);
        Grid.xPoint += 1;
      }
    }

    if (dir.includes('left')) {
      if (Grid.yPoint > 1 && !Grid.isWall(Grid.xPoint, Grid.yPoint - 1)) {
        Grid.clearGrid(Grid.xPoint, Grid.yPoint);
        Grid.yPoint -= 1;
      }
    }

    if (dir.includes('top')) {
      if (Grid.xPoint > 1 && !Grid.isWall(Grid.xPoint - 1, Grid.yPoint)) {
        Grid.clearGrid(Grid.xPoint, Grid.yPoint);
        Grid.xPoint -= 1;
      }
    }

    Grid.renderGrid(dir);
  },

  /**
   * Change current grid direction
   * @param  {String} dir Direction to change to
   */
  turnGrid: function(dir) {
    let currentDir = Grid.getCurrentDir();
    let dirArr = ['top', 'right', 'bottom', 'left'];
    let currentIdx = dirArr.indexOf(currentDir);
    let nextIdx = 0;

    // tun command
    if (dir === 'left') {
      nextIdx = (currentIdx === 0) ? 3 : (currentIdx - 1);
    }
    if (dir === 'right') {
      nextIdx = (currentIdx === 3) ? 0 : (currentIdx + 1);
    }
    if (dir === 'back') {
      nextIdx = (currentIdx < 2) ? currentIdx + 2 : currentIdx - 2;
    }

    // mov command
    if (dir === 'movtop') {
      nextIdx = 0;
    }
    if (dir === 'movright') {
      nextIdx = 1;
    }
    if (dir === 'movbottom') {
      nextIdx = 2;
    }
    if (dir === 'movleft') {
      nextIdx = 3;
    }

    Grid.renderGrid(dirArr[nextIdx]);
  },


  /**
   * Get specified grid
   * @param  {Number} x
   * @param  {Number} y
   * @return {GridNode}
   */
  getGrid: function(x, y) {
    let tables = document.getElementById('table');
    return tables.children[x].children[y];
  },

  getCurrentGrid: function () {
    return Grid.getGrid(Grid.xPoint, Grid.yPoint);
  },

  /**
   * Get next grid in front of current grid
   * @return {Object} {GridNode, x, y} or null
   */
  getNextGrid: function() {
    let coordX = Grid.xPoint;
    let coordY = Grid.yPoint;
    let currendDir = Grid.getCurrentDir();

    switch (currendDir) {
      case 'left':
        coordY = (coordY > 1) ? coordY - 1 : '';
        break;
      case 'right':
        coordY = (coordY < 10) ? coordY + 1 : '';
        break;
      case 'top':
        coordX = (coordX > 1) ? coordX - 1 : '';
        break;
      case 'bottom':
        coordX = (coordX < 10) ? coordX + 1 : '';
        break;
    }

    if (coordX && coordY) {
      let nextGrid = Grid.getGrid(coordX, coordY);
      return {
        grid: nextGrid,
        coordX: coordX,
        coordY: coordY
      };
    } else {
      console.log('next grid is not available');
      return null;
    }
  },

  /**
  * Get current direction
  * @return {String} Direction name eg.'left'
  */
  getCurrentDir: function() {
    let currentGrid = Grid.getCurrentGrid();
    return currentGrid.firstChild.className;
  },

  /**
   * Check if there is a wall in current Direction
   */
  isWall: function(x, y) {
    return Grid.wallGridArr.includes(x + '' + y);
  },

  /**
   * Handle build random wall button
   */
  handleBuildWall: function() {
    let buildBtn = document.getElementById('build');
    let wallNum = document.getElementById('wallnum');
    let randomX;
    let randomY;

    buildBtn.addEventListener('click', function(e) {
      // store the current grid to Grid.wallGridArr
      if (!Grid.wallGridArr.includes(Grid.xPoint + '' + Grid.yPoint)) {
        Grid.wallGridArr.push(Grid.xPoint + '' + Grid.yPoint);
      }

      let num = +wallNum.value || 1;
      for (let i = 0; i < num; i++) {
        setTimeout(function() {
          do {
            randomX = Math.ceil(Math.random() * 10);
            randomY = Math.ceil(Math.random() * 10);
          } while (Grid.wallGridArr.includes(randomX + '' + randomY) && Grid.wallGridArr.length < 100);

          let randomWallGrid = Grid.getGrid(randomX, randomY);
          randomWallGrid.className = 'wall';

          // store wall grid coordinates
          Grid.wallGridArr.push(randomX + '' + randomY);
          if (Grid.wallGridArr.length === 100) {
            console.log('wall is everywhere');
            return;
          }
        }, 150 * i);

      }

    }, false);
  },

  /**
   * Find the path and move to x, y with A* pathFinder algorithm
   * @param  {String} value    Mov to x,y command
   */
  findPath: function(value) {
    let endX = +value.split(' ')[2].split(',')[0];
    let endY = +value.split(' ')[2].split(',')[1];
    let startGrid = Grid.getCurrentGrid();
    let endGrid = Grid.getGrid(endX, endY);
    let grid = Grid.initGridArray();

    // Find the path to move to end grid, get a path node array
    let pathArr = Astar.search(grid, startGrid, endGrid);
    if (pathArr.length === 0) {
      alert('End grid is not available');
      return;
    }

    // Change the path node arry to path direction array
    let nextDirArr = [];
    let currGrid = startGrid;
    for (let i = 0; i < pathArr.length; i++) {
      nextDirArr.push(Grid.pathNodeToDir(currGrid, pathArr[i]));
      currGrid = pathArr[i];
    }

    // Do the move ui
    for (let i = 0; i < nextDirArr.length; i++) {
      setTimeout(function() {
        Grid.moveGrid(nextDirArr[i]);
      }, 500 * i);
    }

  },

  /**
   * Change the pathArr from grid node to dirction description
   * @param  {GridNode} currGrid Current grid node
   * @param  {GridNode} nextGrid Next grid node
   * @return {String}         Direction string
   */
  pathNodeToDir: function(currGrid, nextGrid) {
    if (nextGrid.pos.x < currGrid.pos.x) {
      return 'top';
    }
    if (nextGrid.pos.x > currGrid.pos.x) {
      return 'bottom';
    }
    if (nextGrid.pos.y > currGrid.pos.y) {
      return 'right';
    }
    if (nextGrid.pos.y < currGrid.pos.y) {
      return 'left';
    }
  },

  /**************** Views *****************/

  /**
   * Clear the previous grid ui on board
   * @param  {Number} x
   * @param  {Number} y
   */
  clearGrid: function(x, y) {
    let previousGrid = Grid.getGrid(x, y);
    previousGrid.innerHTML = '';
    previousGrid.removeAttribute('id');
  },

  /**
   * Render the new grid ui on board
   * @param  {GridNode} grid
   * @param  {String} dir
   */
  renderGrid: function(dir) {
    if (dir.includes('tra') || dir.includes('mov')) {
      dir = Grid.headDir.pop();
    }

    let currentGrid = Grid.getCurrentGrid();
    currentGrid.innerHTML = `<span class="${dir}"></span>`;
    currentGrid.id = 'gridmark';
  },

  /**
   * Build a wall in front of current direction, with 'build' command
   */
  buildWall: function() {

    let nextGrid = Grid.getNextGrid();

    if (nextGrid && !nextGrid.grid.className) {
      // store the wall grid coordinates
      Grid.wallGridArr.push(nextGrid.coordX + '' + nextGrid.coordY);
      nextGrid.grid.className = 'wall';
    } else {
      console.log('build error, not the correct location');
    }

  },

  /**
   * Brush the wall in front of current direction
   * @param  {string} brushCommand    Brush command
   */
  brushWall: function(brushCommand) {

    let nextGrid = Grid.getNextGrid();

    if (nextGrid && nextGrid.grid.className) {
      let color = brushCommand.split(' ')[1];
      nextGrid.grid.style.background = color;
    } else {
      console.log('brush error, not the correct location');
    }

  }

};

var Command = {

  invalidCommandArr: [], // store invalid command index
  /**
   * Handle all the command, add event listener to exectue button
   */
  handleCommand: function() {

    let executeBtn = document.getElementById('btn');

    executeBtn.addEventListener('click', function(e) {
      let value = document.getElementById('textarea').value.trim();
      let valueArr = value.split('\n');

      for (let i = 0; i < valueArr.length; i++) {

        if (!Command.checkCommand(valueArr[i])) {
          Command.invalidCommandArr.push(i);
          CommandLine.showLineNum();
          continue;
        } else {
          let commandStr = valueArr[i];
          setTimeout(function() {
            // go command
            if (/^go(\s\d)?$/i.test(commandStr)) {
              Command.commandRepeat(commandStr, Grid.moveGrid, null);

            } else if (/^tun/i.test(commandStr)) {
              // tun command
              if (/^tun lef$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.turnGrid, 'left');
              }
              if (/^tun rig$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.turnGrid, 'right');
              }
              if (/^tun bac$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.turnGrid, 'back');
              }

            } else if (/^tra/i.test(commandStr)) {
              // tra command
              if (/^tra lef(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.moveGrid, 'traleft');
              }
              if (/^tra rig(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.moveGrid, 'traright');
              }
              if (/^tra top(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.moveGrid, 'tratop');
              }
              if (/^tra bot(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.moveGrid, 'trabottom');
              }

            } else if (/^mov/i.test(commandStr)) {
              // mov command
              if (/^mov lef(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.turnGrid, 'movleft');
                Command.commandRepeat(commandStr, Grid.moveGrid, 'movleft');
              }
              if (/^mov rig(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.turnGrid, 'movright');
                Command.commandRepeat(commandStr, Grid.moveGrid, 'movright');
              }
              if (/^mov top(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.turnGrid, 'movtop');
                Command.commandRepeat(commandStr, Grid.moveGrid, 'movtop');
              }
              if (/^mov bot(\s\d)?$/i.test(commandStr)) {
                Command.commandRepeat(commandStr, Grid.turnGrid, 'movbottom');
                Command.commandRepeat(commandStr, Grid.moveGrid, 'movbottom');
              }
              // move to x, y command
              if (/^mov\sto\s([1-9]|10)\,([1-9]|10)$/i.test(commandStr)) {
                Grid.findPath(commandStr);
              }

            } else {
              // build wall command
              if (/^build?/i.test(commandStr)) {
                Grid.buildWall();
              }
              // brush wall command
              if (Command.checkBrushCommand(commandStr)) {
                Grid.brushWall(commandStr);
              }

            }

          }, 1000 * i);
        }
      }
    }, false);
  },

  /**
   * Check if the command is valid
   * @param  {String} value Command stirng e.g.'tra lef 3'
   * @return {Boolean}
   */
  checkCommand: function(value) {
    let goCheck = /^(go(\s\d)?)$/i;
    let tramovCheck = /^((tra|mov)\s(lef|rig|top|bot)(\s\d)?)$/i;
    let tunCheck = /^(tun\s(bac|lef|rig))$/i;
    let buildCheck = /^build$/i;
    let movtoCheck = /^mov\sto\s([1-9]|10)\,([1-9]|10)$/i;
    let commandCheck = goCheck.test(value) || tramovCheck.test(value) || tunCheck.test(value)
                      || buildCheck.test(value) || movtoCheck.test(value);

    return commandCheck || Command.checkBrushCommand(value);
  },

  /**
   * Repeat the command according to the parameter
   * @param  {string}   value   Command string e.g.'go 4'
   * @param  {Function} fn      Command function e.g.'moveGrid'
   * @param  {string}   arg     Command arguments e.g.'left'
   */
  commandRepeat: function(value, fn, arg) {
    let num = 1;

    if (Number.isInteger(+value.slice(-1))) {
      num = +value.slice(-1);
    }
    for (let i = 0; i < num; i++) {
      setTimeout(function() {
        fn(arg);
      }, 900 / num * i);
    }
  },

  /**
   * Check the brush command
   * @param  {String} value Bru wall command.eg 'bru #f59'
   * @return {Boolean}      Return if the brush command is valid
   */
  checkBrushCommand: function(value) {
    // check color regular expression eg.#333 #333333 rgb(111,111,111) rgba(100,100,100,0.5)
    let hexCheck = /^bru\s#([0-9a-f]{3}){1,2}$/i;
    let rgbCheck = /^bru\srgba?\(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\,\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\,\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\,\s?([01]|0?\.[\d]))?\)$/i;

    return hexCheck.test(value) || rgbCheck.test(value);
  }

};

var CommandLine = {
  textarea: document.getElementById('textarea'),

  showLineNum: function() {
    let lineNumDiv = document.getElementById('line-number');
    let valueArr = CommandLine.textarea.value.split('\n');
    let content = ``;

    for (let i = 0; i < valueArr.length; i++) {
      if (Command.invalidCommandArr.includes(i)) {
        content += `<span class="error">${i + 1}</span>`;
      } else {
        content += `<span>${i + 1}</span>`;
      }
    }

    lineNumDiv.innerHTML = content;
  },

  handleLineNum: function() {

    CommandLine.textarea.addEventListener('keyup', function(e) {
      Command.invalidCommandArr = [];
      CommandLine.showLineNum();
    }, false);
    CommandLine.textarea.addEventListener('focus', function(e) {
      CommandLine.showLineNum();
    }, false);
  },

  handleScroll: function() {
    let lineNumberDiv = document.getElementById('line-number');

    CommandLine.textarea.addEventListener('scroll', function() {
      lineNumberDiv.scrollTop = this.scrollTop;
    }, false);
  },

  handleClear: function() {
    let clearBtn = document.getElementById('clear');

    clearBtn.addEventListener('click', function(e) {
      CommandLine.textarea.value = '';
    }, false);
  }
};

var Astar = {
  init: function(grid) {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        grid[x][y].f = 0;
        grid[x][y].g = 0;
        grid[x][y].h = 0;
        grid[x][y].parent = null;
        grid[x][y].pos = {
          x: x,
          y: y
        };
      }
    }
  },

  /**
   * Perform A* path finder algorithm from start grid to end grid
   * @param  {Array}    grid   Grid node array
   * @param  {GridNode} start  Start grid node
   * @param  {GridNode} end    End grid node
   * @return {Array}           Path grid array
   */
  search: function(grid, start, end) {
    Astar.init(grid);

    let openList = [];
    let closedList = [];
    openList.push(start);

    while (openList.length > 0) {
      // Grab the lowest f(x) to process next
      let flag = 0;
      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[flag].f) {
          flag = i;
        }
      }
      let currentNode = openList[flag];

      // End case -- result has been found, return the traced path
      if (currentNode.pos === end.pos) {
        let curr = currentNode;
        let ret = [];
        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        return ret.reverse();
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors
      let index = openList.indexOf(currentNode);
      openList.splice(index, 1);
      closedList.push(currentNode);
      let neighbors = Astar.neighbors(grid, currentNode);

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        if (closedList.includes(neighbor) || neighbor.className === 'wall') {
          continue;
        }

        // g score is the shortest distance from start to current node, we need to check if
        //  the path we have arrived at this neighbor is the shortest one we have seen yet
        let gScore = currentNode.g + 1;
        let gScoreIsBest = false;

        if (!openList.includes(neighbor)) {
          // This is the first time we have arrived at this node, it must be the best
          gScoreIsBest = true;
          neighbor.h = Astar.heuristic(neighbor.pos, end.pos);
          openList.push(neighbor);
        } else if (gScore < neighbor.g) {
          // We have already seen the node, but last time it had a worse g (distance from start)
          gScoreIsBest = true;
        }

        if (gScoreIsBest) {
          // Found an optimal (so far) path to this node. Store info on how we got here and
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }

    // No results was found -- empty array signifies failure to find path
    return [];
  },

  heuristic: function(pos0, pos1) {
    // This is the Manhattan distance
    let d1 = Math.abs(pos1.x - pos0.x);
    let d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  },

  neighbors: function(grid, node) {
    let ret = [];
    let x = node.pos.x;
    let y = node.pos.y;

    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y]);
    }
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y]);
    }
    if (grid[x] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1]);
    }
    if (grid[x] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1]);
    }
    return ret;
  }

};


(function init() {
  Command.handleCommand();
  CommandLine.handleLineNum();
  CommandLine.handleScroll();
  CommandLine.handleClear();
  Grid.handleBuildWall();
  Grid.init();
})();
