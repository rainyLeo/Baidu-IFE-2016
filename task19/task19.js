//TODO 算法可视化
let text = document.getElementById('text');
let leftIn = document.getElementById('leftIn');
let leftOut = document.getElementById('leftOut');
let rightIn = document.getElementById('rightIn');
let rightOut = document.getElementById('rightOut');
let arr = [];

function inputCheck() {
  let input = +text.value;
  if (!Number.isInteger(input) || input < 10 || input > 100) {
    alert('enter a integer between 10 ~ 100');
    return false;
  }
  return true;
}


function lengthCheck() {
  let length = arr.length;
  if (length === 60) {
    alert('max length is 60');
    return false;
  }
  return true;
}

function render(array = arr) {
  let content = ``;
  for (let i = 0, length = array.length; i < length; i++) {
    content += `<div class='box' style='height: ${array[i]}px;' index=${i}></div>`;
  }
  document.getElementById('boxarea').innerHTML = content;
}

leftIn.onclick = function() {
  if (inputCheck() && lengthCheck()) {
    arr.unshift(text.value);
  }
  render();
};

leftOut.onclick = function() {
  let value = arr.shift();
  alert(value);
  render();
};

rightIn.onclick = function() {
  if (inputCheck() && lengthCheck()) {
    arr.push(text.value);
  }
  render();
};

rightOut.onclick = function() {
  let value = arr.pop();
  alert(value);
  render();
};

let box = document.getElementById('boxarea');
box.onclick = function(e) {
  if (e.target.className === 'box') {
    arr.splice(e.target.getAttribute('index'), 1);
    render();
  }
};

let random = document.getElementById('random');
random.onclick = function() {
  arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(Math.floor(Math.random() * 90 + 10));
  }
  render();
};

function bubbleSort(array = arr) {
  let arrBubble = array.slice();

    for (let i = 0, length = arrBubble.length; i < length; i++) {
      for (let j = 0; j < length - i; j++) {
        if (arrBubble[j] > arrBubble[j + 1]) {
          [arrBubble[j], arrBubble[j + 1]] = [arrBubble[j + 1], arrBubble[j]];
        }
      }
    }

  return arrBubble;
}

function merge(left, right) {
  let result = [];
  let il = 0;
  let ir = 0;

  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il]);
      il++;
    } else {
      result.push(right[ir]);
      ir++;
    }
  }
  return result.concat(left.slice(il)).concat(right.slice(ir));

}

function mergeSort(array = arr) {

  if (array.length < 2) {
    return array;
  }

  let middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

let bubbleBtn = document.getElementById('bubble');
bubbleBtn.onclick = function() {
  console.log('bubble');
  let array = bubbleSort();
  render(array);
};

let mergeBtn = document.getElementById('merge');
mergeBtn.onclick = function() {
  console.log('merge');
  let array = mergeSort();
  render(array);
};
