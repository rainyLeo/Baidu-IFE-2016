let xPoint = 5;
let yPoint = 5;
let headDir = [];
let errorArr = [];

function commandRepeat(value, fn, arg) {
  let num = 1;

  if (Number.isInteger(+value.slice(-1))) {
    num = +value.slice(-1);
  }
  for (let i = 0; i < num; i++) {
    setTimeout(function() {
      fn(arg);
    }, 900 / num * i);
  }
}

function handleCommand() {
  let initBox = getBox(xPoint, yPoint);
  initBox.innerHTML = '<span class="top"></span>';
  initBox.id = 'init';
  let executeBtn = document.getElementById('btn');

  executeBtn.addEventListener('click', function(e) {
    let value = document.getElementById('textarea').value.trim();
    let valueArr = value.split('\n');

    for (let i = 0; i < valueArr.length; i++) {

      if (!checkCommand(valueArr[i])) {
        errorArr.push(i);
        showLineNum();
      }

      setTimeout(function() {
        // go
        if (/^go(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], moveBox, null);
        }

        // tun
        if (/^tun lef$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], turnBox, 'left');
        }
        if (/^tun rig$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], turnBox, 'right');
        }
        if (/^tun bac$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], turnBox, 'back');
        }

        // tra
        if (/^tra lef(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], moveBox, 'traleft');
        }
        if (/^tra rig(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], moveBox, 'traright');
        }
        if (/^tra top(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], moveBox, 'tratop');
        }
        if (/^tra bot(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], moveBox, 'trabottom');
        }

        // mov
        if (/^mov lef(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], turnBox, 'movleft');
          commandRepeat(valueArr[i], moveBox, 'movleft');
        }
        if (/^mov rig(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], turnBox, 'movright');
          commandRepeat(valueArr[i], moveBox, 'movright');
        }
        if (/^mov top(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], turnBox, 'movtop');
          commandRepeat(valueArr[i], moveBox, 'movtop');
        }
        if (/^mov bot(\s\d)?$/i.test(valueArr[i])) {
          commandRepeat(valueArr[i], turnBox, 'movbottom');
          commandRepeat(valueArr[i], moveBox, 'movbottom');
        }

      }, 1000 * i);
    }
  }, false);

}

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

  // tun
  if (dir === 'left') {
    nextIdx = (currentIdx === 0) ? 3 : (currentIdx - 1);
  }
  if (dir === 'right') {
    nextIdx = (currentIdx === 3) ? 0 : (currentIdx + 1);
  }
  if (dir === 'back') {
    nextIdx = (currentIdx < 2) ? currentIdx + 2 : currentIdx - 2;
  }

  // mov
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

function showLineNum() {
  let div = document.getElementById('line-number');
  let textarea = document.getElementById('textarea');
  let valueArr = textarea.value.split('\n');
  let content = ``;

  for (let i = 0; i < valueArr.length; i++) {
    if (errorArr.includes(i)) {
      content += `<span class="error">${i + 1}</span>`;
    } else {
      content += `<span>${i + 1}</span>`;
    }
  }

  div.innerHTML = content;
}

function handleLineNum() {
  let textarea = document.getElementById('textarea');

  textarea.addEventListener('keyup', function(e) {
    errorArr = [];
    showLineNum();
  }, false);
}

function checkCommand(value) {
  let pattern = /^(go(\s\d)?)$|^((tra|mov)\s(lef|rig|top|bot)(\s\d)?)$|^(tun\s(bac|lef|rig))$/gi;

  return pattern.test(value);
}

function handleScroll() {
  let lineNumberDiv = document.getElementById('line-number');
  let textarea = document.getElementById('textarea');

  textarea.addEventListener('scroll', function() {
    lineNumberDiv.scrollTop = this.scrollTop;
  }, false);
}

function handleClear() {
  let clearBtn = document.getElementById('clear');

  clearBtn.addEventListener('click', function(e) {
    document.getElementById('textarea').value = '';
  }, false);
}

(function init() {
  handleCommand();
  handleLineNum();
  handleScroll();
  handleClear();
})();
