{
  let text = document.getElementById('text');
  let leftIn = document.getElementById('leftIn');
  let leftOut = document.getElementById('leftOut');
  let rightIn = document.getElementById('rightIn');
  let rightOut = document.getElementById('rightOut');
  let arr = [];

  function check() {
    if (!Number.isInteger(+text.value)) {
      alert('enter a integer');
      return false;
    }
    return true;
  }

  function render() {
    let content = ``;
    for (let i = 0, length = arr.length; i < length; i++) {
      content += `<div class='box' index=${i}>${arr[i]}</div>`;
    }
    document.getElementById('boxarea').innerHTML = content;
  }

  leftIn.onclick = function() {
    if (check()) {
      arr.unshift(text.value);
    }
    render();
  };

  leftOut.onclick = function() {
    let value = arr.shift();
    alert(value);
    render();
  }

  rightIn.onclick = function () {
    if (check()) {
      arr.push(text.value);
    }
    render();
  };

  rightOut.onclick = function () {
    let value = arr.pop();
    alert(value);
    render();
  }

  let box = document.getElementById('boxarea');
  box.onclick = function(e) {
    if (e.target.className === 'box') {
      arr.splice(e.target.getAttribute('index'), 1);
      render();
    }
  }
}
