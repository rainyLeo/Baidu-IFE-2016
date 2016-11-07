let tableData = {
  dataArr: [[], [], [], []],
  trArea: document.getElementsByTagName('tr'),
  trArr: [],
  setData: function () {
    this.trArr = Array.prototype.slice.call(this.trArea, 1);
    let column2 = document.querySelectorAll('tbody td:nth-of-type(2)');
    let column3 = document.querySelectorAll('tbody td:nth-of-type(3)');
    let column4 = document.querySelectorAll('tbody td:nth-of-type(4)');
    let column5 = document.querySelectorAll('tbody td:nth-of-type(5)');

    for (let i = 0; i < 3; i++) {
      this.dataArr[0].push(+column2[i].textContent);
      this.dataArr[1].push(+column3[i].textContent);
      this.dataArr[2].push(+column4[i].textContent);
      this.dataArr[3].push(+column5[i].textContent);
    }
  }
};
tableData.setData();

function getSortedIndex(sortMethod, arr) {
  let sortedArr = arr.slice().sort(function(a, b) {
    return (sortMethod === 'ascend') ? a - b : b - a;
  });

  let sortedIndexArr = [];
  arr.forEach(function(e, i, a) {
    var sortIndex = a.indexOf(sortedArr[i]);
    sortedIndexArr.push(sortIndex);
  });

  return sortedIndexArr;
}

function sortTable(sortMethod, index) {
  let sortedArr = getSortedIndex(sortMethod, tableData.dataArr[index]);

  renderUI(sortedArr);
}

function renderUI(arr) {
  let tbody = document.getElementById('tr-area');

  tbody.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    tbody.appendChild(tableData.trArr[arr[i]]);
  }
}

function handleSortEvent() {
  let arrowUp = document.getElementsByClassName('arrow-up');
  let arrowDown = document.getElementsByClassName('arrow-down');

  for (let i = 0, len = arrowUp.length; i < len; i++) {
    arrowUp[i].addEventListener('click', function() {
      sortTable('ascend', i);
    }, false);

    arrowDown[i].addEventListener('click', function() {
      sortTable('descend', i);
    }, false);
  }
}
handleSortEvent();
