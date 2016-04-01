/**
 * Display non enumerable properties of given object
 * It is important to rememeber that forEach and (for var in obj)
 * work only with enumerable objects
 * Source: MDN
 */
function objEnumerableCheck( testedObj ) {
    "use strict";

    var enumAndNonenumPrts = Object.getOwnPropertyNames( testedObj );
    var enumOnlyPrts = Object.keys( testedObj );
    var nonEnumOnlyPrts = enumAndNonenumPrts.filter( function( key ) {

        var indexInEnum = enumOnlyPrts.indexOf( key );
        if ( indexInEnum == -1 ) {

            // Not found in enumOnlyPrts keys mean the key is non-enumerable,
            // so return true so we keep this in the filter
            return true;

        } else {

            return false;
        }
    } );

    console.log( "Object being tested: ", testedObj );
    nonEnumOnlyPrts.forEach( function( val, idx, array ) {

        console.log( "Property ", val, "is not enumerable" );
    } );
}
