# Examples of JS code that I (and probably other programmers) need to remember

Collection of methods providing a quick recap of some concepts, patterns and unusual behavior

## InternalBehavior.js

### numIssuesPrecision()

 * Numerical issues with precision that we need to remember

### convertToBool()

 * Convert any variable to boolean type
 * Without Boolean() call

### objAndValue()

* Calculation boolean expressions with object && value

### compBehavior()

 * Tricky comparrator conversion
 * Expected: value converted to true or falce
 * Real: Boolean converted to value 1 or 0
 * Caution.

## LowLevelObjectMethods.js

### objEnumerableCheck( testedObj )

 * Display non enumerable properties of given object
 * It is important to rememeber that forEach and (for var in obj)
 * work only with enumerable objects
 * Source: MDN

## Scope.js

### scopeUnusualBehavior()

 * Example of block scope in action
 * Programmer probably will assume that declaring i in first
 * for loop will bind this var to for loop scope.
 * It doesn't.

## ConstructorPatterns.js

### defPrtConstructor()

 * Object definition with defineProperties
 * Prototyping
 * Inheritance

### constrFunc()

 * Consstructor function pattern example
 * "All-public class" build
 * Decorator example

### factoryEx()

 * Factory function example

### ModulePattern( callBackFcn )

 * Module class pattern with public and private
 * properties and methods

### flyweightEx()

  * Flyweight concept

### facadeEx()

 * Facade example
 
