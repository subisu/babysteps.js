/**
 * Monad example in action
 */

function monadEx() {
    function MONAD( modifier ) {

        var prototype = Object.create( null );

        function unit( value ) {

            var monad = Object.create( prototype );
            monad.bind = function( func, args ) {

                return func.apply( undefined,
                                   [ value ].concat(
                                       Array.prototype.slice.apply( args || [] ) )
                                 );
            };

            if ( typeof modifier === "function" ) {
                modifier( monad, value );
            }

            return monad;
        }

        return unit;
    }

    var unit = MONAD();

    var monad = unit( "Hello" );

    monad.bind( console.log, [ 1, 2, 3 ] );

    var maybe = MONAD( function( monad, value ) {
        if ( value === null || value === undefined ) {
            monad.isNull = true;
            monad.bind = function() {
                return monad;
            };
        }
    } );

    var monadMaybe = maybe( null );
    monadMaybe.bind( null );
}

/**
 * Usage example of standart library Promises
 */
function standartPromiseEx() {

    function fakeAjax( url, callbackFunc ) {

        var fakeResponses = {
            "file1": "The first text",
            "file2": "The middle text",
            "file3": "The last text"
        };
        var randomDelay = ( Math.round( Math.random() * 1E4 ) % 8000 ) + 1000;

        console.log( "Requesting: " + url );

        setTimeout( function() {

            callbackFunc( fakeResponses[ url ] );
        }, randomDelay );
    }

    function output( text ) {
        console.log( text );
    }

    // **************************************

    function getFile( file ) {
        return new Promise( function( resolve ) {
            fakeAjax( file, resolve );
        } );
    }

    // Request all files at once in
    // "parallel" via `getFile(..)`.
    //
    // Render as each one finishes,
    // but only once previous rendering
    // is done.

    var fileNames = [ "file1", "file2", "file3" ];

    fileNames.map( getFile )
    .reduce(
        function( chain, filePromise ) {
            return chain
                .then( function() {
                    return filePromise;
                } )
                .then( output );
        },
        Promise.resolve() // Fulfilled promise to start chain
    )
    .then( function() {
        output( "Complete!" );
    } );

}

standartPromiseEx();
