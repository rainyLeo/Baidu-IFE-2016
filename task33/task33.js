let xPoint = 5;
let yPoint = 5;

function init() {
  let initBox = getBox(xPoint, yPoint);
  initBox.innerHTML = '<span class="top"></span>';
  initBox.id = 'init';

  let executeBtn = document.getElementById('btn');
  executeBtn.addEventListener('click', function(e) {
    let value = document.getElementById('command').value.trim();

    // move
    if (/^go$/i.test(value)) {
      moveBox();
    }
    // turn left
    if (/^tun lef$/i.test(value)) {
      turnBox('left');
    }
    // turn right
    if (/^tun rig$/i.test(value)) {
      turnBox('right');
    }
    // turn back
    if (/^tun bac$/i.test(value)) {
      turnBox('back');
    }
  }, false);

}

init();

function moveBox() {
  let dir = getDir();

  if (dir === 'right') {
    if (yPoint < 10) {
      clearBox(xPoint, yPoint);
      yPoint += 1;
    }
  }

  if (dir === 'bottom') {
    if (xPoint < 10) {
      clearBox(xPoint, yPoint);
      xPoint += 1;
    }
  }

  if (dir === 'left') {
    if (yPoint > 1) {
      clearBox(xPoint, yPoint);
      yPoint -= 1;
    }
  }

  if (dir === 'top') {
    if (xPoint > 1) {
      clearBox(xPoint, yPoint);
      xPoint -= 1;
    }
  }

  renderBox(null, dir);
}

function turnBox(dir) {
  let currentDir = getDir();
  let dirArr = ['top', 'right', 'bottom', 'left'];
  let currentIdx = dirArr.indexOf(currentDir);
  let nextIdx = 0;

  if (dir === 'left') {
    nextIdx = (currentIdx === 0) ? 3 : (currentIdx - 1);
  }

  if (dir === 'right') {
    nextIdx = (currentIdx === 3) ? 0 : (currentIdx + 1);
  }

  if (dir === 'back') {
    nextIdx = (currentIdx < 2) ? currentIdx + 2 : currentIdx - 2;
  }

  renderBox(null, dirArr[nextIdx]);
}

function getDir() {
  let currentBox = getBox(xPoint, yPoint);
  return currentBox.firstChild.className;
}

function getBox(x, y) {
  let tables = document.getElementById('table');
  return tables.children[x].children[y];
}

function clearBox(x, y) {
  let current = getBox(x, y);
  current.innerHTML = '';
  current.removeAttribute('id');
}

function renderBox(box, dir) {
  box = box || getBox(xPoint, yPoint);
  box.innerHTML = `<span class="${dir}"></span>`;
  box.id = 'init';
}
