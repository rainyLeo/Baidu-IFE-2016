let radio = document.getElementsByName('student');
let schoolArea = document.getElementById('school');
let jobArea = document.getElementById('job');

for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('change', function(e) {
    if (e.target.id === 'boarder') {
      schoolArea.style.display = 'block';
      jobArea.style.display = 'none';
    }
    if (e.target.id === 'extern') {
      jobArea.style.display = 'block';
      schoolArea.style.display = 'none';
    }
  }, false);
}

let city = document.getElementById('city');
city.addEventListener('change', function(e) {
  let citySchool = e.target.value;
  let school = document.getElementById(citySchool + '-school');

  document.getElementById('beijing-school').style.display = 'none';
  document.getElementById('shanghai-school').style.display = 'none';
  document.getElementById('nanjing-school').style.display = 'none';
  school.style.display = 'inline-block';
}, false);
