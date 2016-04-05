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
