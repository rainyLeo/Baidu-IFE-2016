/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {

};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  let city = document.getElementById('aqi-city-input').value.trim();
  let value = parseInt(document.getElementById('aqi-value-input').value.trim(), 10);
  let cityCheck = /^[a-zA-Z\u4E00-\u9FA5]{2,}$/;

  if (!cityCheck.test(city)) {
    alert('Please enter a city name');
  } else if (!Number.isInteger(value) || value < 0 || value > 200) {
    alert('Please enter a integer between 0 ~ 200');
  } else {
    aqiData[city] = value;
    document.getElementById('aqi-city-input').value = '';
    document.getElementById('aqi-value-input').value = '';
  }
  
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  let table = document.getElementById('aqi-table');
  let keys = Object.keys(aqiData);
  let len = keys.length;
  
  if (len !== 0) {
    let content = `<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>`;

    for (let i = 0; i < len; i++) {
      content += `<tr>
                    <td>${keys[i]}</td>
                    <td>${aqiData[keys[i]]}</td>
                    <td><button id='delete' name=${keys[i]}>删除</button></td>
                  </tr>`;
    }
    table.innerHTML = content;
  } else {
    table.innerHTML = '';
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  delete aqiData[event.target.name];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  let addBtn = document.getElementById('add-btn');
  addBtn.addEventListener('click', addBtnHandle, false);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数, 事件委托
  let table = document.getElementById('aqi-table');
  table.addEventListener('click', function(event) {
    if (event.target.id === 'delete') {
      delBtnHandle(event);
    }
  }, false);

}

init();
