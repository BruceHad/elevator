// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

// Floor Constructor
function Floor(number, height){
  this.floor = number;
  var line = new fabric.Line([0, 0, 149, 0], {
    left: 0,
    top: height,
    stroke: 'black',
    strokeWidth: 1
  });

  this.getTop = function(){
    return line.getTop();
  };

  canvas.add(line);
}

// Elevator
function Elevator(floors, floorAt){
  this.floorAt = floorAt;
  var floor = floors[floorAt-1];
  var height = 17;
  var width = 10;
  var elevator = new fabric.Rect({
    left: 100,
    top: floor.getTop() - height,
    fill: 'red',
    width: width,
    height: height
  });
  canvas.add(elevator);

  this.move = function(){
    if(is.getStack().length > 1){
      var nextFloor = is.get();
    }
  };
}
// Person Constructor
function Person(position){
  var circle = new fabric.Circle({
    left: position[0],
    top: position[1],
    fill: 'black',
    radius: 5
  });
  function up(){
    circle.animate('top', '-=1', {
      duration: 100,
      onComplete: down
    });
  }
  function down(){
    circle.animate('top', '+=1', {
      duration: 100,
      onComplete: up
    });
  }
  this.getTop = function(){
    return circle.getTop();
  };
  canvas.add(circle);
  up();
}

// Instruction Stack
function InstructionStack(){
  var stack = [];
  var next;

  this.add = function(floor){
    if(stack.length != 8 && stack[stack.length-1] != floor){
      stack.push(floor);
      this.update();
    }
  };

  this.get = function(){
    next = stack.shift();
    return next;
  };

  this.remove = function(){
    stack.pop();
    this.update();
  };

  this.getStack = function(){
    return stack;
  };

  this.stackString = function(){
    var s = '';
    if(next)
      s += '('+next+') ';
    else
      s += '( ) ';
    for(var i in stack){
      s += stack[i] + ' ';
    }
    return s;
  };

  this.update = function(){
    canvas.remove(this.text);
    this.text = new fabric.Text(this.stackString(), {
      left: 10,
      top: 10,
      fontFamily: 'sans-serif',
      fontSize: 16
    });
    canvas.add(this.text);
  };

  this.update();
}

var floors = [new Floor(1, 140)];
var is = new InstructionStack;
var elevator = new Elevator(floors, 1);
// var p1 = new Person([10, 90]);

// Events
addEventListener('keydown', function(event){
  if(event.keyCode === 49){
    is.add(1);
  }
  else if(event.keyCode === 50){
    is.add(2);
  }
  else if(event.keyCode === 51){
    is.add(3);
  }
  else if(event.keyCode === 8){
    is.remove();
  }
});


// Game Loop
function GameLoop(){
  elevator.move();
  canvas.renderAll();
  window.requestAnimationFrame(GameLoop);
}
window.requestAnimationFrame(GameLoop);

// function Person(position){
//   var circle = new fabric.Circle({
//     left: position[0],
//     top: position[1],
//     fill: 'black',
//     radius: 5
//   });
//   function up(){
//     circle.animate('top', '-=1', {
//       duration: 150,
//       onChange: canvas.renderAll.bind(canvas),
//       onComplete: down
//     });
//   }
//   function down(){
//     circle.animate('top', '+=1', {
//       duration: 150,
//       onChange: canvas.renderAll.bind(canvas),
//       onComplete: up
//     });
//   }
//   canvas.add(circle);
//   up();
// }
// var people = [];
// for (var i=1; i<=3; i++){
//   var x = i * 20;
//   var y = 90;
//   people.push(new Person([x, y]));
// }
