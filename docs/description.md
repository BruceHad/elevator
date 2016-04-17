# Elevator

07/04/2016

["Do you think you can program and elevator?"](https://github.com/mshang/python-elevator-challenge)

No. Probably not.

But I'm going to have a go at creating (possibly the most boring) game out of operating an elevator.

# Basic Mechanics

## Operator

Keyboard controls. Uses the number to select a floor. 

Operator has some more control than in a standard lift, but not much.

Can queue a number of floors in advance. 

Can cancel the most recent selection, but not the current select.

Can change the currently selected floor, but cannot change direction (so can stop on the way, but can't go back, see?)

## Lift

A lift itself can hold a number of people. 

It will travel to and stop at a floor based on the queue of stops.

It will remain at the floor until:

  All the people that want to exit do so;

  and all the people that want to alight do so (or limit reached) then travel to the next floor

## People

People are generated programatically at different floors. 

People select the direction they want when they arrive at the elevator.

People select the floor they want when they get on the elevator (this usually matches the direction they chose).

People get off the elevator when they arrive at their floor.

People get angry when they have to wait for the elevator.

They also get angry when the elevator goes to different floor.

## Gameplay

If too many people get too angry, the operator loses their job.