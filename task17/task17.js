
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';

  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}


function getTitle() {
  switch (pageState.nowGraTime) {
    case 'day':
      return '每天';
    case 'week':
      return '每周平均';
    case 'month':
      return '每月平均'
  }
}

//渲染图表
function renderChart() {
  let chart = document.getElementById('aqi-chart-wrap');
  let arr = chartData[pageState.nowSelectCity];
  console.log('arr in renderChart', arr);
  let content = ``;
  let color;
  let width, margin;

  for (let i = 0, length = arr.length; i < length; i++) {
    switch (true) {
      case arr[i] < 100:
        color = 'green';
        break;
      case arr[i] < 200:
        color = 'blue';
        break;
      case arr[i] < 300:
        color = 'pink';
        break;
      case arr[i] < 400:
        color = 'red';
        break;
      case arr[i] < 500:
        color = 'black';
        break;
    }
    switch (true) {
      case arr.length < 4:
        width = '13%';
        margin = '18px';
        break;
      case arr.length < 20:
        width = '6%';
        margin = '4px';
        break;
      case arr.length < 100:
        width = '0.9%';
        margin = '1.1px';
        break;
    }

    content += `<div class='container' value=${i} style='width: ${width}; margin: 0 ${margin}; height: ${arr[i]}px; background: ${color};'>
                </div>`;
  }
  content = `<div class='title'>${pageState.nowSelectCity}市01～03月${getTitle()}空气质量</div>${content}`;

  chart.innerHTML = content;

  hover(arr);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化
    if (event.target.value === 'day') {
      pageState.nowGraTime = 'day';
    } else if (event.target.value === 'week') {
      pageState.nowGraTime = 'week';
    } else {
      pageState.nowGraTime = 'month';
    }

  // 设置对应数据
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  let time = document.getElementById('form-gra-time');
  time.onclick = function(event) {
    graTimeChange(event);
  };

  let show = document.getElementsByClassName('gramitem');
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(option) {
  // 确定是否选项发生了变化
  let citySelect = option.text;
  console.log('cicySelect', citySelect);
  pageState.nowSelectCity = citySelect;

  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化城市Select下拉选择框中的选项
  */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  let select = document.getElementById('city-select');
  let cityName = ``;
  for (let city in aqiSourceData) {
    cityName += `<option>${city}</option>`;
  }
  select.innerHTML = cityName;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.onchange = function(event) {
      let option = event.target.options[event.target.selectedIndex];
      citySelectChange(option);
  };
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for (let city in aqiSourceData) {
    let arr = [];
    for (let date in aqiSourceData[city]) {
      arr.push(aqiSourceData[city][date]);
    }

    let step = 1;
    if (pageState.nowGraTime === 'week') {
      step = 7;
    } else if (pageState.nowGraTime === 'month') {
      step = 30;
    }

    for (let i = 0; i < arr.length; i += step) {
      let sum = 0;
      for (let j = i; j < i + step; j++) {
        sum += arr[j];
      }
      arr[i / step] = sum / step;
    }

    arr.length = Math.floor(91 / step);
    chartData[city] = arr;
  }

}

//鼠标按下显示当天数据
function hover(arr) {
  let wrap = document.getElementById('aqi-chart-wrap');
  wrap.onmousedown = function(event) {
    if (event.target.className === 'container') {
      alert(arr[event.target.getAttribute('value')].toFixed(1));
    }
  }
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();

}

init();
