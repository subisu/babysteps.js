
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

scopeUnusualBehavior();
