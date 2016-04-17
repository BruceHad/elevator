Reminder...

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

Three main ways to create objects:

1. Object intialiser (literal {})
2. Using a constructor function and _new_ (creating an object from a class).
3. Using Object.create

You can create objects using an object initialiser (literal).

    var obj = {property1: value_1,...}

Object initialisers are expressions and each of them creates a new object. Objects are created as if a call to a new Object() were made, they are instances of Object.

You can also create objects using a constructor function.

Note, there is a strong convention to use a capital initial letter.

This is done using a contructor function (similar to a 'class'):

    function Car(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }

Then you can create new objects from the constructor function using the _new_.

    var mycar = new Car("Citroen", "Cactus", "2015");

Using Object.create() lets you choose the prototype object for the object you want to create, without having to define a constructor function.

You can define the prototype(?) object using an object initialiser (or somehting), then use that for the new object.

    var Animal = {
      type: "Invertebrates", // Default value of properties
      displayType : function() {  // Method which will display type of Animal
        console.log(this.type);
      }
    }
    var animal1 = Object.create(Animal);

## Inheritance

All objects inherit from at least one other objects. The object being inherited from is know as the prototype object.



