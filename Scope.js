/**
 * Lessons about scope and closure
 */

module.exports = {
    scopeUnusualBehavior: scopeUnusualBehavior,
    withBehavior: withBehavior
};

/**
 * Example of block scope in action
 * Programmer probably will assume that declaring i in first
 * for loop will bind this var to for loop scope.
 * It doesn't.
 */
function scopeUnusualBehavior() {
    "use strict";

    // Since there no var statement, i will represent
    // parent function variable
    function changer( ) {
        i += 2;
    }

    for ( var i = 0; i < 10; i += 1 ) {
        console.log( i );

        // This will change i
        changer();
    }

    console.log( "out i", i );

    for ( let i = 0; i < 5; i += 1 ) {
        console.log( "Block i: ", i );
    }

    console.log( "out i", i );
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

