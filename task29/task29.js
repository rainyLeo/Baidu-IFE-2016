let validateBtn = document.getElementById('validate');

function check() {
  let input = document.getElementById('input');
  let value = input.value;
  let text = '';
  let length = 0;

  for (let i = 0; i < value.length; i++) {
    // 中文，中文标点
    if (/[\u4E00-\u9FA5\uFF00-\uFFEF]/.test(value[i])) {
      length += 2;
    } else {
      length += 1;
    }
  }

  if (length === 0) {
    text = '姓名不能为空';
    input.className = 'invalid';
  } else if (length < 4 || length > 16) {
    text = '名称格式错误';
    input.className = 'invalid';
  } else {
    text = '名称格式正确';
    input.className = 'valid';
  }

  document.getElementById('display').textContent = text;
}

validateBtn.addEventListener('click', check, false);
