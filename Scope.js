
/**
 * Example of block scope in action
 * Programmer probably will assume that declaring i in first
 * for loop will bind this var to for loop scope.
 * It doesn't.
 */
function scopeUnusualBehavior() {
    "use strict";

    for ( var i = 0; i < 10; i++ ) {
        console.log( i );
    }

    console.log( "out i", i );

    for ( let i = 0; i < 5; i++ ) {
        console.log( i );
    }

    console.log( "out i", i );
}

