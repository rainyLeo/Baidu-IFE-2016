let text = document.getElementById('text');
let input = document.getElementById('input');
let tag = document.getElementById('tag');
let add = document.getElementById('add');
let hobby = document.getElementById('hobby');
let tagArr = [];
let hobbyArr = [];

function renderTag(index = '') {
  let content = ``;

  for (let i = 0, length = tagArr.length; i < length; i++) {
    if (index && i === +index) {
      content += `<div class='tag hover' index=${i}>删除${tagArr[i]}</div>`;
    } else {
      content += `<div class='tag' index=${i}>${tagArr[i]}</div>`;
    }
  }

  tag.innerHTML = content;
}

function renderHobby() {
  let content = ``;

  for (let i = 0, length = hobbyArr.length; i < length; i++) {
    content += `<div class='hobby'>${hobbyArr[i]}</div>`;
  }
  hobby.innerHTML = content;
}

// textarea内兴趣爱好添加
function addValue() {
  let pattern = /[\s,，]+/;
  let value = text.value;
  value = value.replace(/^[,，\s]+|[,，\s]+$/g, '');

  if (value) {
    if (pattern.test(value)) {
      let inputArr = value.split(pattern);
      hobbyArr = hobbyArr.concat(inputArr);
    } else {
      hobbyArr.push(value);
    }
  }

  hobbyArr = Array.from(new Set(hobbyArr)); // 去除数组重复
  while (hobbyArr.length > 10) {
    hobbyArr.shift();
  }
}

// Tag相关事件
input.addEventListener('keyup', function(event) {
  input.value = input.value.replace(/[,，\s]+/g, '');

  if ([13, 32, 188].includes(event.keyCode)) {
    if (input.value && !tagArr.includes(input.value)) {
      tagArr.push(input.value);
    }
    if (tagArr.length > 10) {
      tagArr.shift();
    }

    input.value = '';
    renderTag();
  }
}, false);

tag.addEventListener('mouseover', function(event) {
  if (event.target.className === 'tag') {
    console.log(tagArr[event.target.getAttribute('index')]);
    let index = event.target.getAttribute('index');
    renderTag(index);
  }
}, false);

tag.addEventListener('mouseout', function(event) {
  renderTag();
});

tag.addEventListener('click', function(event) {
  if (event.target.className === 'tag hover') {
    tagArr.splice(event.target.getAttribute('index'), 1);
    renderTag();
  }
}, false);

// 兴趣爱好事件
add.addEventListener('click', function() {
  addValue();
  renderHobby();
}, false);
