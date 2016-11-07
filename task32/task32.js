let $ = function(query) {
  return document.querySelector(query);
};

let formObj = {
  label: '名称', // 表单标签
  type: 'input',
  ruleName: '', // 表单类型
  validator: function() {}, // 表单验证规
  rules: '必填，长度为4-16个字符', // 填写规则提示
  success: '格式正确', // 验证通过提示
  fail: '名称不能为空' // 验证失败提示
};


function inputBox() {
  let inputType = $('#input-type');
  let name = $('#name-input');
  let input = '';

  inputType.addEventListener('click', function(e) {
    if (e.target.nodeName === 'INPUT') {
      name.value = e.target.value;
      input = e.target.id;

      if (input.includes('text')) {
        $('#input-content').style.display = 'none';
      } else {
        $('#input-content').style.display = 'block';
      }

      if (input === 'text') {
        $('#input-rule').style.display = 'block';
      } else {
        $('#input-rule').style.display = 'none';
      }
    }

    formObj.type = input;
    formObj.label = name.value;
  }, false);
}

function configBox() {
  let name = $('#name-input');

  name.addEventListener('blur', function() {
    formObj.label = name.value;
  }, false);
}

function ruleBox() {
  let rule = $('#input-rule');
  let ruleName = '';

  rule.addEventListener('change', function(e) {
    if (e.target.nodeName === 'INPUT') {
      ruleName = e.target.value;
    }

    formObj.ruleName = ruleName;
  }, false);

}

function addBtn() {
  let add = $('#add-btn');

  add.addEventListener('click', function(e) {
    formOutput();
  }, false);
}

function formOutput() {
  let output = $('#form-output');
  let content = ``;
  let ele = document.createElement('div');
  let value = $('#textarea-content').value.trim().split(/[\s,]+/);
  let type = formObj.type;

  if (type === 'text') {
    content = `<label for='input-output'>${formObj.label}</label>
               <input type=${formObj.ruleName} id='input-output'>`;

  } else if (type === 'radio' || type === 'checkbox') {
    for (let i = 0; i < value.length; i++) {
      content += `<input id='${formObj.type}${i}' type='${formObj.type}' name='${formObj.type}-content'>
                  <label for='${formObj.type}${i}'>${value[i]}</label>`;
    }
    content = `<span>${formObj.label}</span>${content}`;

  } else if (type === 'select') {
    for (let i = 0; i < value.length; i++) {
      content += `<option>${value[i]}</option>`
    }
    content = `<span>${formObj.label}</span><select>${content}</select>`

  } else if (type === 'textarea') {
    content += `<span>${formObj.label}</span><textarea rows='5' cols='40'></textarea>`
  }

  ele.innerHTML = content;
  output.appendChild(ele);
}

inputBox();
ruleBox();
configBox();
addBtn();
