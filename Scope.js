/**
 * Lessons about scope and closure
 */

module.exports = {
    scopeBehavior: scopeBehavior,
    withBehavior: withBehavior
};

/**
 * Example of block scope in action
 * Programmer probably will assume that declaring i in first
 * for loop will bind this var to for loop scope.
 * It doesn't.
 */
function scopeBehavior() {
    "use strict";

    // Since there no var statement, i will represent
    // parent function variable
    function changer( ) {
        i += 2;
    }

    console.log( "If we use var statement in following loop, it won't bind i to loop block" );
    console.log( "for ( var i = 0; i < 10; i += 1 ) {" );
    console.log( "It will actually declare i within scope of scopeBehavior." );
    console.log( "And if we call a function within the same parent function scope" );
    console.log( "function changer( ) { i += 2; }" );
    console.log( "and forget to declare changer's i properly" );
    console.log( "this function will actually change variable inside parent function scope" );
    console.log( "and affect flow of the loop" );
    console.log( "Instead of 0-9 we get:" );

    for ( var i = 0; i < 10; i += 1 ) {
        console.log( i );

        // This will change i
        changer();
    }

    console.log( "If we use \"let\" statement variable i will be in \"for\" block scope" );
    console.log( "for ( let i = 0; i < 5; i += 1 ) {" );

    for ( let i = 0; i < 5; i += 1 ) {
        console.log( "Block i: ", i );

        // This won't change i
        changer();
    }

    console.log( "The function actually changed parens function\'s i", i );
}

/**
 * "with" statement behavior
 * The with statement takes an object, one which has zero or more properties,
 * and treats that object as if it is a wholly separate lexical scope, and thus
 * the object's properties are treated as lexically defined identifiers in that "scope"
 * Source: YDKJS
 */
function withBehavior() {

    var objA = {
        a: 1
    };

    var objB = {
        b: 2
    };

    var b = 1;

    function setObj( objToChange ) {

        with ( objToChange ) {

            // If "with" won't find b in object it will treat this variable
            // as if there was no "with" statement. It will change variable
            // b within parent function scope
            b = 3;

            // This won't declare new object property.
            // New variable will be created within function scope
            var c = 5;
        }

        // Even though a with block treats an object like a lexical scope,
        // a normal var declaration inside that with block will not be scoped
        // to that with block, but instead the containing function scope.
        console.log(  "objToChange.c, c" );
        console.log( objToChange.c + "      " + c );
    }

    setObj( objA );
    setObj( objB );

    console.log( "objA,     objB,   b" );
    console.log( objA, objB, b );
}

