/**
 * Monad example in action
 */

function monadEx() {
    function MONAD() {

        return function unit( value ) {

            var monad = Object.create( null );
            monad.bind = function( func ) {
                return func( value );
            };
            return monad;
        };
    }

    var unit = MONAD();

    var monad = unit( "Hello" );

    monad.bind( console.log );
}
