// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');
var line = new fabric.Line([0, 0, 150, 0], {
  left: 0,
  top: 100,
  stroke: 'black',
  strokeWidth: 2
});
canvas.add(line);

function Person(position){
  var circle = new fabric.Circle({
    left: position[0],
    top: position[1],
    fill: 'black',
    radius: 5
  });
  function up(){
    circle.animate('top', '-=1', {
      duration: 150,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: down
    });
  }
  function down(){
    circle.animate('top', '+=1', {
      duration: 150,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: up
    });
  }
  canvas.add(circle);
  up();
}
var people = [];
for (var i=1; i<=3; i++){
  var x = i * 20;
  var y = 90;
  people.push(new Person([x, y]));
}
console.log(people);
