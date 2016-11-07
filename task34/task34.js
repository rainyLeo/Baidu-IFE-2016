let xPoint = 5;
let yPoint = 5;
let headDir = [];

function init() {
  let initBox = getBox(xPoint, yPoint);
  initBox.innerHTML = '<span class="top"></span>';
  initBox.id = 'init';

  let executeBtn = document.getElementById('btn');
  executeBtn.addEventListener('click', function(e) {
    let value = document.getElementById('command').value.trim();

    // go
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

    // tra left
    if (/^tra lef$/i.test(value)) {
      moveBox('traleft');
    }
    // tra right
    if (/^tra rig$/i.test(value)) {
      moveBox('traright');
    }
    // tra top
    if (/^tra top$/i.test(value)) {
      moveBox('tratop');
    }
    // tra bottom
    if (/^tra bot$/i.test(value)) {
      moveBox('trabottom');
    }

    // mov left
    if (/^mov lef$/i.test(value)) {
      turnBox('movleft');
      moveBox('movleft');
    }
    // mov right
    if (/^mov rig$/i.test(value)) {
      turnBox('movright');
      moveBox('movright');
    }
    // mov top
    if (/^mov top$/i.test(value)) {
      turnBox('movtop');
      moveBox('movtop');
    }
    // mov bottom
    if (/^mov bot$/i.test(value)) {
      turnBox('movbottom');
      moveBox('movbottom');
    }
  }, false);

}

init();

function moveBox(dir) {
  dir = dir || getDir();

  if (dir.includes('right')) {
    headDir.push(getDir());

    if (yPoint < 10) {
      clearBox(xPoint, yPoint);
      yPoint += 1;
    }
  }

  if (dir.includes('bottom')) {
    headDir.push(getDir());

    if (xPoint < 10) {
      clearBox(xPoint, yPoint);
      xPoint += 1;
    }
  }

  if (dir.includes('left')) {
    headDir.push(getDir());

    if (yPoint > 1) {
      clearBox(xPoint, yPoint);
      yPoint -= 1;
    }
  }

  if (dir.includes('top')) {
    headDir.push(getDir());

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

  if (dir === 'movleft') {
    nextIdx = 3;
  }

  if (dir === 'movright') {
    nextIdx = 1;
  }

  if (dir === 'movtop') {
    nextIdx = 0;
  }

  if (dir === 'movbottom') {
    nextIdx = 2;
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
  if (dir.includes('tra') || dir.includes('mov')) {
    dir = headDir.pop();
  }

  box = box || getBox(xPoint, yPoint);
  box.innerHTML = `<span class="${dir}"></span>`;
  box.id = 'init';
}
