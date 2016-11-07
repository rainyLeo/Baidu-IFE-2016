let inorder = document.getElementById('inorder');
let preorder = document.getElementById('preorder');
let postorder = document.getElementById('postorder');
let box = document.body.firstElementChild;
let nodeList = [];

function inOrder(node) {
  if (node) {
    if (node.firstElementChild !== null) {
      inOrder(node.firstElementChild);
    }

    nodeList.push(node);

    if (node.lastElementChild !== null) {
      inOrder(node.lastElementChild);
    }
  }
}

function preOrder(node) {
  if (node) {
    nodeList.push(node);

    if (node.firstElementChild !== null) {
      preOrder(node.firstElementChild);
    }

    if (node.lastElementChild !== null) {
      preOrder(node.lastElementChild);
    }
  }
}

function postOrder(node) {
  if (node) {
    if (node.firstElementChild !== null) {
      postOrder(node.firstElementChild);
    }

    if (node.lastElementChild !== null) {
      postOrder(node.lastElementChild);
    }

    nodeList.push(node);
  }
}

let timer = null;
function render() {
  let i = 0;
  nodeList[0].style.border = '2px solid #00f';

  timer = setInterval(function() {
    i++;

    if (i < nodeList.length) {
      nodeList[i - 1].style.border = '1px solid #000';
      nodeList[i].style.border = '2px solid #00f';

    } else {
      clearInterval(timer);
      nodeList[nodeList.length - 1].style.border = '1px solid #000';
    }
  }, 700);

}

inorder.addEventListener('click', function() {
  init();
  inOrder(box);
  render();
}, false);

preorder.addEventListener('click', function() {
  init();
  preOrder(box);
  render();
}, false);

postorder.addEventListener('click', function() {
  init();
  postOrder(box);
  render();
}, false);

function init() {
  nodeList = [];
  clearInterval(timer);
  let divs = document.getElementsByTagName('div');
  for (let i = 0; i < divs.length; i++) {
		divs[i].style.border = '1px solid #000';
	}
}
