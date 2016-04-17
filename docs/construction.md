# Program Design

## Technology

It's a web game, so is programmed in Javascript, using the FabricJS library for the canvas elements and animation.

On the HTML page there is a canvas element with low level controls for drawing images on the page.

FabricJS is a wrapper that provides some higher level abstractions for drawing, hiding a lot of the complexity.

## Canvas 

So we start with the canvas element: 

    var canvas = new fabric.Canvas('canvas');

## GameLoop

A simple loop refreshes the canvas 60 times a second (or thereabouts) and renders any updates, creating the animation. It also fires off an 'update' instruction to the Controller so it can check if any new actions need to be carried out.

## The Building

Then we can consider all the _Building_ features, currently:

* The Floors
* The Elevator
* The Controller (includes the Display)

### Floors

The Building has multiple Floors. Floors is made up a number of simple objects. Their main purpose is to draw the floors on the canvas. 

There only interaction with other objects is to tell the elevator their vertical position, so it can calculate where to go.

Public interface: 

* getTop(floorNumber)

### Elevator

The Elevator is a single object that can move between floors.

(It can contain people as well, but forget about that for now)

For now, the main interface that the Elevator has is with the user, via the Controller.

It requires the Floors to get the position to move to.

The Elevator receives instructions from a Controller which will cause it to move to a new floor.

Public interface:

* init() - sets initial values for elevator.
* goToFloor(floorNumber) - moves elevator to floorNumber.
* isMoving() - lets the controller know, can be true of false.
* currentFloor

### Controller

The Controller is an interface between the user and Elevator and holds the logic for controlling the Elevator.

It has some event watchers looking out for keyboard input and adds new instructions to a Queue.

The Queue & Elevator's currentFloor is displayed on screen.

Public interface:

* update() - on a loop, the controller checks the status and fires off instructions to the elevator, depending on game state.
* init() - sets up the display.

Basic set up:


Onto the canvas paint some floors.

    Floors have a number and a height.

Then onto the canvas paint an elevator.

    The elevator starts at floor one. 

    It can move between floors.

Now we need a game loops that renders the canvas 60 times a second so we can create animations.

And a _controller_ that watches for user input and sends instructions to the _elevator_.

    The _controller_ has an _instruction queue_ to store instructions.
    
    At each _turn_, a new instruction is popped off the _instruction queue_ and passed to the elevator.

### PersonGenerator

Time based person generator. Spawns new Persons, selecting the floor the person is spawned on.

### Person

Spawned on a floor. Follows certain rules. Contains information to display to the user:

* Direction - Up or Down (based on floor required)
* Floor Required - where the Person wants to go.
* Anger - Based on level of time kept waiting.

Person 0. Required floor generated. 1. Approaches elevator and selects/displays Direction. 2. When elevator arrives, Person boards and displays Floor. 3. When elevator arrives at floor, person gets off. 4. Anger increases over time; decreases slightly when elevator arrives; drops to zero when reaches floor.


