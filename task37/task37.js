let container = document.getElementById('container');
let floatArea = document.getElementById('floatarea');
let drag = document.getElementById('dragarea');

container.addEventListener('click', function(e) {
  if ((e.target.id === 'floatarea') || (e.target.id === 'dragarea')) {
    floatArea.style.display = 'block';
  } else {
    floatArea.style.display = 'none';
    container.style.background = '#fff';
  }
}, false);

let dragTarget = document.getElementById('dragarea');
let inDrag = false;
let dragStartX, dragStartY;
let objInitLeft, objInitTop;
dragTarget.addEventListener('mousedown', function(e) {
  inDrag = true;
  // e.stopPropagation();
  e.preventDefault();
  objInitLeft = floatArea.offsetLeft;
  objInitTop = floatArea.offsetTop;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
}, false);
document.addEventListener('mousemove', function(e) {
  if (!inDrag) {
    return;
  }

  let nextX = objInitLeft + e.clientX - dragStartX;
  let nextY = objInitTop + e.clientY - dragStartY;
  if (nextX - 160 > 0 && nextY - 135 > 0) {
    floatArea.style.left = nextX + 'px';
    floatArea.style.top = nextY + 'px';
  }

}, false);
document.addEventListener('mouseup', function(e) {
  inDrag = false;
}, false);
