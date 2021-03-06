/* global module fabric require*/
'use strict';

var misc = require('./misc');

function Floors(canvas, noFloors){
  var ch = canvas.getHeight();
  var cw = canvas.getWidth();
  this.noFloors = noFloors;
  this.floors = [];
  this.init = function(){
    for(var i=1; i<=this.noFloors; i++){
      var conf = {
        left: 2,
        top: Math.floor(ch-i * ch/(this.noFloors+1)),
        stroke: misc.htr('#bbbbbb'),
        strokeWidth: 8
      };
      var floor = new fabric.Line([0, 0, cw - 8, 0], conf);
      canvas.add(floor);
      this.floors.push(floor);
    }
  };
}

function Elevator(canvas, fl){
  var config = {
    height: 15,
    width: 30,
    leftPos: canvas.getWidth() - 100,
    noFloors: fl.length,
    shaftTop: fl.floors[fl.noFloors - 1].getTop(),
    shaftBottom: fl.floors[0].getTop()
  };
  var moving = false;
  this.currentFloorNumber = 1;

  this.init = function(){
    var floor = fl.floors[this.currentFloorNumber - 1];
    this.elevator = createBox(floor);
    createShaft();
  };

  this.isMoving = function(){
    return moving;
  };

  this.goToFloor = function(floorNumber){
    moving = true;
    var distance = getHeightChange(floorNumber, this);
    this.elevator.animate('top', distance, {
      duration: 1500,
      onComplete: switchMoving
    });
    this.currentFloorNumber = floorNumber;
  };

  function getHeightChange(floorNumber, self){
    // need something of the form '+=100'
    var currentFloor = fl.floors[self.currentFloorNumber - 1];
    var current = currentFloor.getTop();
    var next = fl.floors[floorNumber - 1].getTop();
    var change = next - current;
    if(change < 0) return '-='+Math.abs(change);
    else return '+='+Math.abs(change);
  }

  function switchMoving(){
    moving = moving ? false : true;
  }

  function createBox(floor){
    var elevator = new fabric.Rect({
      top:  floor.getTop() - config.height,
      left: config.leftPos,
      height: config.height,
      width: config.width,
      fill: misc.htr('#AAAAAA')
    });
    canvas.add(elevator);
    return elevator;
  }

  function createShaft(){
    var height = config.shaftTop - config.shaftBottom;
    var shaft1 = new fabric.Line([0, 0, 0, height], {
      left: config.leftPos - 2,
      top: config.shaftTop,
      stroke: misc.htr('#AAAAAA'),
      strokeWidth: 1
    });
    var shaft2 = new fabric.Line([0, 0, 0, height], {
      left: config.leftPos + config.width + 1,
      top: config.shaftTop,
      stroke: misc.htr('#AAAAAA'),
      strokeWidth: 1
    });
    canvas.add(shaft1);
    canvas.add(shaft2);
  }
}

function Controller(canvas, elevator){
  var queue = [];
  var queueLength = 0; // for checking updates

  function add(floorNumber){
    console.log(queue[queue.length - 1], floorNumber);
    if(queue.length != 8
      && queue[queue.length - 1] != floorNumber){
      queue.push(floorNumber);
    }
  }

  function getNext(){
    return queue.shift();
  }

  function removePrevious(){
    queue.pop();
  }

  function getQueueString(){
    return queue.join(' ');
  }

  function displayQueue(){
    var currentBox = new fabric.Rect({
      top:  10,
      left: 10,
      height: 18,
      width: 18,
      stroke: misc.htr('#AAAAAA'),
      fill: 'white'
    });
    canvas.add(currentBox);

    var queueBox = new fabric.Rect({
      top:  10,
      left: 30,
      height: 18,
      width: 8 * 16 + 4,
      stroke: misc.htr('#AAAAAA'),
      fill: 'white'
    });
    canvas.add(queueBox);

    if(typeof displayCurrent != 'undefined')
      canvas.remove(displayCurrent); // clear display
    var floor = '' + elevator.currentFloorNumber;
    var displayCurrent = new fabric.Text(floor, {
      top: 12,
      left: 14,
      fontFamily: 'sans-serif',
      fontSize: 16
    });
    canvas.add(displayCurrent);

    if(typeof displayQueue != 'undefined')
      canvas.remove(displayQueue); // clear display
    var displayQueue = new fabric.Text(getQueueString(),{
      top: 12,
      left: 32,
      fontFamily: 'sans-serif',
      fontSize: 16,
      fill: misc.htr('#999999')
    });
    canvas.add(displayQueue);
  }

  this.update = function(){
    // displayQueue();
    if(queue.length != queueLength){
      displayQueue();
      queueLength = queue.length;
    }
    if(queue.length > 0){
      if(!elevator.isMoving()) {
        var nextFloor = getNext();
        elevator.goToFloor(nextFloor);
      }
    }
  };

  this.init = function(){
    displayQueue();
  };
  /* Events */
  window.addEventListener('keydown', function(event){
    if(event.keyCode === 49){
      add(1);
    }
    else if(event.keyCode === 50){
      add(2);
    }
    else if(event.keyCode === 51){
      add(3);
    }
    else if(event.keyCode === 8){
      removePrevious();
    }
  });
}

var exports = {};
exports.Elevator = Elevator;
exports.Floors = Floors;
exports.Controller = Controller;
module.exports = exports;
