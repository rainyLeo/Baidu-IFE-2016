function checkName() {
  let name = document.getElementById('name');
  let value = name.value;
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
    name.className = 'invalid';
  } else if (length < 4 || length > 16) {
    text = '名称格式错误';
    name.className = 'invalid';
  } else {
    text = '名称格式正确';
    name.className = 'valid';
  }

  document.getElementById('namecheck').textContent = text;
  return name.className;
}

function checkPassword() {
  let password = document.getElementById('password');
  let value = password.value;
  let text = '';
  // 至少8个字符，包括数字和大小写
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (value === '') {
    text = '密码不能为空';
    password.className = 'invalid';
  } else if (!pattern.test(value)) {
    text = '密码格式错误';
    password.className = 'invalid';
  } else {
    text = '密码格式正确';
    password.className = 'valid';
  }

  document.getElementById('passwordcheck').textContent = text;
  return password.className;
}

function checkPassword2() {
  let password = document.getElementById('password');
  let password2 = document.getElementById('password2');
  let text = '';

  if (password2.value === '') {
    text = '密码不能为空';
    password2.className = 'invalid';
  } else if (password2.value === password.value) {
    text = '密码输入一致';
    password2.className = 'valid';
  } else {
    text = '密码输入不一致';
    password2.className = 'invalid';
  }

  document.getElementById('password2check').textContent = text;
  return password2.className;
}

function checkEmail() {
  let email = document.getElementById('email');
  let value = email.value;
  let text = '';
  // 验证邮箱地址
  let pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  if (value === '') {
    text = '邮箱不能为空';
    email.className = 'invalid';
  } else if (pattern.test(value)) {
    text = '邮箱格式正确';
    email.className = 'valid';
  } else {
    text = '邮箱格式错误';
    email.className = 'invalid';
  }

  document.getElementById('emailcheck').textContent = text;
  return email.className;
}

function checkMobile() {
  let mobile = document.getElementById('mobile');
  let value = mobile.value;
  let text = '';
  // 验证手机号码
  let pattern = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

  if (value === '') {
    text = '手机不能为空';
    mobile.className = 'invalid';
  } else if (pattern.test(value)) {
    text = '手机格式正确';
    mobile.className = 'valid';
  } else {
    text = '手机格式错误';
    mobile.className = 'invalid';
  }

  document.getElementById('mobilecheck').textContent = text;
  return mobile.className;
}

// 初始化，添加事件监听
function init() {
  let input = document.getElementsByTagName('input');
  let hintArr = ['必填，长度为4～16个字符', '密码8位以上，包括字母大小写和数字', '再次输入相同密码', '输入邮箱地址', '输入手机号码'];
  let checkArr = [checkName, checkPassword, checkPassword2, checkEmail, checkMobile];

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('focus', function focusInput(e) { // 焦点
      e.target.nextElementSibling.textContent = hintArr[i];
    }, false);

    input[i].addEventListener('blur', function focusInput(e) { // 失去焦点
      let func = checkArr[i];
      func();
    }, false);
  }

  let validateBtn = document.getElementById('validate');
  validateBtn.addEventListener('click', function() {
    for (let i = 0; i < checkArr.length; i++) {
      let fun = checkArr[i]();
      if (fun === 'invalid') {
        alert('Failed');
        return;
      }
    }

    alert('Success!');
  }, false);
}

init();
