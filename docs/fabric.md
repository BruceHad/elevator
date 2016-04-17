# Fabric

07/04/2016

http://fabricjs.com/

Fabric is a library for drawing on the Canvas, making it easier to interact and update the drawing. It provides and object model on top of the native canvas methods. Takes care of state and rendering and lets work with drawn objects directly.

Objects are created like so:

    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    
And added to the canvas like:

    canvas.add(rect);
    
The position can be updated simply.

    rect.set({ left: 20, top: 50 });
    canvas.renderAll();

A bit simpler than canvas. No need to erase and re-draw all the component. Just update the object and render.

Fabric provides 7 basic shapes:

* Circle
* Ellipse
* Line
* Polygon
* Polyline
* Rect
* Triangle

These objects have properties that can be get or set:

* left, top
* width, height
* fill, opacity
* stroke, strokeWidth,
* scaleX, scaleY
* angle
* flipX, flipY

Methods can be chained together: 

    rect.set('angle', 15).set('flipY', true);
    
Objects are in a heirarchy. Most objects inherit from root fabric.Object. This allows you to create methods that are shared by all objects. e.g.

    fabric.Object.prototype.getAngleInRadians = function() {
      return this.getAngle() / 180 * Math.PI;
    };
    
Fabric has a Canvas object, which is a wrapper around the html canvas element.

    var canvas = new fabric.Canvas('canvas_id');

It's responsible for managing all the objects. You can add, remove, and reference objects on the canvas.

It also serves as the configuration host for the canvas.

## Interactivity

Fabric has interactivity built in.

The object model allows programmatic access and manipulation of objects on canvas.

There are ways to manipulate those objects via user interfaces (mouse, touch).

By default, objects can be selected, dragged and grouped.

This is controlled by the fabrics selection property or with the objects selectable property.

    var canvas = new fabric.Canvas('c');
    canvas.selection = false; // disable group selection
    rect.set('selectable', false); // make object unselectable
    
You also have the option of creating a StaticCanvas.

## Animation

