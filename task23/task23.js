let depth = document.getElementById('depth');
let breadth = document.getElementById('breadth');
let depthsearch = document.getElementById('depthsearch');
let breadthsearch = document.getElementById('breadthsearch');
let input = document.getElementById('input');
let box = document.body.firstElementChild;
let nodeList = [];
let index = null;
let find = false;


function searchValue(node) {
  let value1 = node.textContent;
  let value2 = node.firstChild.textContent.replace(/\s/g, '');
  if (value1 === input.value || value2 === input.value) {
    index = nodeList.indexOf(node);
  }
}

function depthFirst(node) {
  if (node) {
    nodeList.push(node);
    for (let i = 0, length = node.children.length; i < length; i++) {
      depthFirst(node.children[i]);
    }

    // search the value
    searchValue(node);
  }
}

function breadthFirst(node) {
  let temp = [];
  nodeList.push(node);

  while (node) {
    // search the value
    searchValue(node);

    for (let i = 0, length = node.children.length; i < length; i++) {
      temp.push(node.children[i]);
    }
    node = temp.shift();
    if (node) {
      nodeList.push(node);
    }
  }
}



let timer = null;

function render() {
  let i = 0;
  nodeList[0].style.border = '2px solid #00f';

  timer = setInterval(function() {
    i++;

    if (index === null) {

      if (i < nodeList.length) {
        nodeList[i - 1].style.border = '1px solid #000';
        nodeList[i].style.border = '2px solid #00f';

      } else {
        clearInterval(timer);
        nodeList[nodeList.length - 1].style.border = '1px solid #000';
        if (!find) {
          alert('not find');
        }
      }

    } else {

      if (i < index) {
        nodeList[i - 1].style.border = '1px solid #000';
        nodeList[i].style.border = '2px solid #00f';

      } else if (index > 0) {
        clearInterval(timer);
        nodeList[i - 1].style.border = '1px solid #000';
        nodeList[i].style.border = '2px solid #f00';
      } else {
        clearInterval(timer);
        nodeList[0].style.border = '2px solid #f00';
      }
    }

  }, 500);

}


depth.addEventListener('click', function() {
  init();
  depthFirst(box);
  find = true;
  render();
}, false);

breadth.addEventListener('click', function() {
  init();
  breadthFirst(box);
  find = true;
  render();
}, false);

depthsearch.addEventListener('click', function() {
  init();
  depthFirst(box);
  render();
}, false);

breadthsearch.addEventListener('click', function() {
  init();
  breadthFirst(box);
  render();
}, false);

function init() {
  nodeList = [];
  index = null;
  clearInterval(timer);
  let divs = document.getElementsByTagName('div');
  for (let i = 0; i < divs.length; i++) {
    divs[i].style.border = '1px solid #000';
  }
}
