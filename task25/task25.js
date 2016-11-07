let depthsearch = document.getElementById('depthsearch');
let input = document.getElementById('input');
let deleteBtn = document.getElementById('delete');
let addBtn = document.getElementById('add');
let addInput = document.getElementById('addinput');
let divs = document.getElementsByTagName('div');
let box = document.body.firstElementChild;
let nodeList = [];
let index = null;
let find = false;
let clicked = false;
let arrow = document.getElementsByTagName('span');

for (let i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener('click', handle, false);
}

function handle(e) {

  if (!clicked) {
    // e.target.nextElementSibling.style.display = 'none';
    e.target.parentNode.lastElementChild.style.display = 'none';
    e.target.parentNode.firstElementChild.className = ''
    clicked = true;
  } else {
    // e.target.nextElementSibling.style.display = 'block';
    e.target.parentNode.lastElementChild.style.display = 'block';
    e.target.parentNode.firstElementChild.className = 'click'

    clicked = false;
  }
}

let wrap = document.getElementById('wrapper');

let item = document.getElementsByClassName('item');

let deleteItem = document.createElement('button');
deleteItem.textContent = '删除';

let addItem = document.createElement('button');
addItem.textContent = '添加';

function deleteHandle() {

  deleteItem.setAttribute('id', 'deletebtn');
  addItem.setAttribute('id', 'addbtn');


  let deleteitem = document.getElementById('deletebtn');
  let additem = document.getElementById('addbtn');

  for (let i = 0; i < item.length; i++) {

    item[i].onmouseenter = function(e) {
      // if (e.target.firstElementChild) {
      //   e.target.insertBefore(deleteItem, e.target.firstElementChild);
      //   e.target.insertBefore(addItem, e.target.firstElementChild);
      // } else {
        e.target.appendChild(deleteItem);
        e.target.appendChild(addItem);
      // }

    };

    item[i].onmouseleave = function(e) {
      if (e.target.hasChildNodes()) {
        e.target.removeChild(deleteItem);
        e.target.removeChild(addItem);
      }
    };
  }
}

deleteHandle();

wrap.addEventListener('click', function(e) {
  if (e.target.nodeName === 'BUTTON' && e.target.textContent === '删除') {
    if (e.target.parentNode.nodeName === 'LI') {
      e.target.parentNode.innerHTML = '';
    } else {
      e.target.parentNode.parentNode.innerHTML = '';
    }
  }

  if (e.target.nodeName === 'BUTTON' && e.target.textContent === '添加') {
    let userInput = prompt('enter a node');
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.textContent = userInput;
    li.setAttribute('class', 'item');
    ul.appendChild(li);

    e.target.parentNode.appendChild(ul);

  }

  deleteHandle();
});

//
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

depthsearch.addEventListener('click', function() {
  init();
  depthFirst(box);
  render();
}, false);

// remove and add the node
for (let i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', function(e) {

    init();
    // e.target.style.background = '#ff0';
    // e.stopPropgation();

    deleteBtn.onclick = function() {
      e.target.parentNode.removeChild(e.target);
    };

    addBtn.onclick = function() {
      if (addInput.value === '') {
        alert('enter a text value');
      } else {
        let ele = document.createElement('div');
        ele.textContent = addInput.value;
        e.target.appendChild(ele);
      }
    };
  });
}

function init() {
  nodeList = [];
  index = null;

}
