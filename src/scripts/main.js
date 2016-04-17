/* global require fabric */
'use strict';

var building = require('./building');
// var controller = require('./controller');
var canvas = new fabric.Canvas('canvas');

var fl = new building.Floors(canvas, 3);
fl.init();
var el = new building.Elevator(canvas, fl);
el.init();
var ct = new building.Controller(canvas, el);
ct.init();

// Game Loop
function GameLoop(){
  ct.update();
  canvas.renderAll();
  window.requestAnimationFrame(GameLoop);
}
window.requestAnimationFrame(GameLoop);
