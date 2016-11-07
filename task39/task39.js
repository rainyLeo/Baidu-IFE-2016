
let Data = {
  ROW: 5,
  COLUMN: 5,
  tableData: [
    ['姓名', '语文', '数学', '英语', '总分'],
    ['小明', 84, 69, 68, 234],
    ['小红', 90, 70, 85, 257],
    ['小张', 59, 75, 66, 215],
    ['小李', 68, 65, 83, 236],
    ['小亮', 87, 94, 89, 266]
  ],
  columnData: [ // 成绩列数据
    [],
    [],
    [],
    []
  ],
  tbodyNode: [], // 成绩<tr></tr>行数据
  setData: function() {
    for (let i = 0; i < Data.ROW; i++) { // 行数
      for (let j = 0; j < Data.COLUMN - 1; j++) { // 列数
        this.columnData[j].push(this.tableData[i + 1][j + 1]);
      }
    }
  }
};
Data.setData();

(function createTable() {
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  let theadContent = ``;
  for (let i = 0; i < Data.COLUMN; i++) {
    if (i === 0) {
      theadContent += `<td>${Data.tableData[0][i]}
                         <span></span>
                         <span></span>
                       </td>`;
    } else {
      theadContent += `<td>${Data.tableData[0][i]}
                         <span class="arrow-up"></span>
                         <span class="arrow-down" ></span>
                       </td>`;
    }
  }
  thead.innerHTML = theadContent;

  for (let i = 0; i < Data.ROW; i++) {
    let trContent = ``;
    for (let j = 0; j < Data.COLUMN; j++) {
      trContent += `<td>${Data.tableData[i + 1][j]}</td>`;
    }
    trContent = `<tr>${trContent}</tr>`;
    Data.tbodyNode.push(trContent);
  }
  tbody.innerHTML = Data.tbodyNode.join('');

  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById('table').appendChild(table);
})();


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
  let sortedArr = getSortedIndex(sortMethod, Data.columnData[index]);
  renderUI(sortedArr);
}

function renderUI(arr) {
  let tbody = document.getElementsByTagName('tbody')[0];

  tbody.innerHTML = '';
  let content = ``;
  for (let i = 0; i < Data.ROW; i++) {
    content += Data.tbodyNode[arr[i]];
  }
  tbody.innerHTML = content;
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


let thead = document.getElementsByTagName('thead')[0];
let table = document.getElementsByTagName('table')[0];
document.addEventListener('scroll', function() {
  let scrTop = document.body.scrollTop;
  let ofsTop = table.offsetTop;
  if (scrTop >= ofsTop) {
    if (scrTop <= ofsTop + 180) {
      thead.classList.add('overlap');
    } else if (scrTop > ofsTop + 180) {
      thead.classList.remove('overlap');
    }
  } else {
    thead.classList.remove('overlap');
  }

}, false);
