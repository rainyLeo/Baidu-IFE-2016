
  let text = document.getElementById('text');
  let leftIn = document.getElementById('leftIn');
  let leftOut = document.getElementById('leftOut');
  let rightIn = document.getElementById('rightIn');
  let rightOut = document.getElementById('rightOut');
  let input = document.getElementById('input');
  let search = document.getElementById('search');
  let box = document.getElementById('boxarea');
  let arr = [];

  function check() {
    let pattern = /^[\w\u4E00-\u9FA5]+[\s,，\w\u4E00-\u9FA5]*$/;
    if (!pattern.test(text.value)) {
      alert('请输入数字、英文或中文，用逗号或空格隔开');
      return false;
    }
    return true;
  }

  function render(str = '') {
    let content = ``;
    let temp = '';

    for (let i = 0, length = arr.length; i < length; i++) {
      if (str.length > 0 && arr[i].includes(str)) {
        temp = arr[i].replace(new RegExp(str, 'g'), `<span>${str}</span>`);
      }
      if (temp) {
        content += `<div class='box' index=${i}>${temp}</div>`;
      } else {
        content += `<div class='box' index=${i}>${arr[i]}</div>`;
      }
      temp = '';
    }
    box.innerHTML = content;
  }

  leftIn.onclick = function() {
    if (check()) {
      let pattern = /[\s,，]+/;
      let value = text.value;

      value = value.replace(/[,，\s]+$/, '');
      if (pattern.test(value)) {
        let inputArr = value.split(pattern);
        arr = inputArr.concat(arr);
      } else {
        arr.unshift(value);
      }
    }
    render();
  };

  leftOut.onclick = function() {
    let value = arr.shift();
    alert(value);
    render();
  };

  rightIn.onclick = function() {
    if (check()) {
      let pattern = /[\s,，]+/;
      let value = text.value;

      value = value.replace(/[,，\s]+$/, '');
      if (pattern.test(value)) {
        let inputArr = value.split(pattern);
        arr = arr.concat(inputArr);
      } else {
        arr.push(value);
      }
    }
    render();
  };

  rightOut.onclick = function() {
    let value = arr.pop();
    alert(value);
    render();
  };

  box.onclick = function(e) {
    if (e.target.className === 'box') {
      arr.splice(e.target.getAttribute('index'), 1);
      render();
    }
  };

  search.onclick = function() {
    let str = input.value.trim();
    render(str);
  };
