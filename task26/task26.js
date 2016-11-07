let MyNamespace = (function() {

  let createBtn = document.getElementById('create');
  let _controlArr = [true, false, false, false];

  createBtn.addEventListener('click', function() {
    let index = _controlArr.indexOf(false);
    if (index !== -1) {
      let ship = document.getElementById('ship' + (index + 1));
      let control = document.getElementById('orbit' + (index + 1) + 'control');
      ship.style.display = 'block';
      control.style.display = 'block';
      _controlArr[index] = true;
    }
  });

  return {
    controlArr: _controlArr
  };

})();


function SpaceShip(id, speed, consumeSpeed, chargeSpeed, flying) {
  this.id = id;
  this.speed = speed;
  this.consumeSpeed = consumeSpeed;
  this.chargeSpeed = chargeSpeed;
  this.flying = flying;
  this.degree = 0;
  this.battery = 0;
  this.orbitTimer = null;
  this.chargeTimer = null;
}

SpaceShip.prototype = {

  fly: function() {
    let id = this.id;
    let energy = document.getElementById('energy' + id);
    let ship = document.getElementById('ship' + id);
    let startBtn = document.getElementById('start' + id);
    let that = this;

    startBtn.addEventListener('click', function() {
      clearInterval(that.chargeTimer);

      if (that.flying === false) {
        that.orbitTimer = setInterval(function() {
          if (+energy.textContent >= that.consumeSpeed) {
            that.flying = true;
            energy.textContent = +energy.textContent - that.consumeSpeed;
            that.degree += that.speed;
            ship.style.transform = `rotate(${that.degree}deg)`;

          } else if (+energy.textContent < that.consumeSpeed && energy.textContent > 0) {
            that.flying = false;
            energy.textContent = 0;

          } else if (+energy.textContent === 0) {
            that.flying = false;
            clearInterval(that.orbitTimer);

            that.charge();
          }
        }, 1000);

      }

    });
  },

  stop: function() {
    let that = this;
    let stopBtn = document.getElementById('stop' + this.id);

    stopBtn.addEventListener('click', function() {
      that.flying = false;
      clearInterval(that.orbitTimer);
    });
  },

  destroy: function() {
    let ship = document.getElementById('ship' + this.id);
    let controlPanel = document.getElementById('orbit' + this.id + 'control');
    let energy = document.getElementById('energy' + this.id);
    let destroyBtn = document.getElementById('destroy' + this.id);
    let that = this;

    destroyBtn.addEventListener('click', function() {
      ship.style.display = 'none';
      ship.style.transform = '';
      energy.textContent = 100;
      that.flying = false;
      that.degree = 0;
      controlPanel.style.display = 'none';
      clearInterval(that.orbitTimer);
      clearInterval(that.chargeTimer);
      MyNamespace.controlArr[that.id - 1] = false;
    });
  },

  charge: function() {
    let energy = document.getElementById('energy' + this.id);
    let that = this;

    if (+energy.textContent === 0 && that.flying === false) {
      that.chargeTimer = setInterval(function() {
        if (+energy.textContent + that.chargeSpeed < 100) {
          energy.textContent = +energy.textContent + that.chargeSpeed;
        } else {
          energy.textContent = 100;
          clearInterval(that.chargeTimer);
        }
      }, 1000);

    }
  },

  receiveOrder: function() {

  },

  init: function() {
    this.fly();
    this.stop();
    this.destroy();
  }

};

let spaceship1 = new SpaceShip(1, 20, 10, 5, false);
spaceship1.init();

let spaceship2 = new SpaceShip(2, 15, 8, 8, false);
spaceship2.init();

let spaceship3 = new SpaceShip(3, 10, 6, 10, false);
spaceship3.init();

let spaceship4 = new SpaceShip(4, 5, 4, 9, false);
spaceship4.init();
