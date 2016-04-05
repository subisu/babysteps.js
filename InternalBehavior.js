/**
 * Numerical issues with precision
 */
function numIssuesPrecision() {

    var total = 3.3 + 5.1;
    console.log( total ); //8.399999999999999
    console.log( total.toFixed( 2 ) );

    var a = 0.1;
    var b = 0.2;
    var c = 0.3;

    console.log( "( ( a + b ) + c ) === ( a + ( b + c ) ):" );
    console.log( ( ( a + b ) + c ) === ( a + ( b + c ) ) );
}

/**
 * Convert any variable to boolean type
 * Without Boolean() call
 */
function convertToBool() {

    var toBool = "22";
    console.log( !!toBool );
}

/**
 * Number to string conversions
 */
function numToStr() {
    var strNum = "123";

    console.log( Number( strNum ),
                 +strNum,
                 parseInt( strNum, 10 ) );
    // Be aware that parseInt parses "0777" strings as octal numbers
    // Always use 10 radix
}

/**
 * Calculation boolean expressions with object && value
 */
function objAndValue() {
    var obj = {
        test: "calc"
    };

    console.log( "Object and number: ", obj && 99 );
    console.log( "Object and same object: ", obj && obj );
    console.log( "Boolean and number: ", true && 99 );
    console.log( "Null and NaN:", null && NaN );
}

/**
 * Tricky comparrator behavior 
 * Implicit conversion
 * Expected: value converted to true or falce
 * Real: Boolean converted to value 1 or 0
 * Caution.
 */
function compBehavior() {

    console.log( "true == 1 : ", true == 1 );
    console.log( "true == 2 : ", true == 2 );
    console.log( "true === 2 : ", true === 2 );
    console.log( "NaN === NaN : ", NaN === NaN );
    console.log( "NaN !== NaN : ", NaN !== NaN );
    console.log( "isNaN( NaN ) : ", isNaN( NaN ) );
}

/**
 * Important example of proper braces positioning
 * In leftPos we assume that return statement will take
 * object on next line of code and return it.
 * JS compiler will actually put semicolon right after return statement
 * resulting in returning undefined value
 *
 * rightPos is showing how to return objects properly
 */
function returningObjectsAndPositionOfBraces() {

    function leftPos() {
        return
        {
            ok: true
        };
    }

    function rightPos() {
        return {
            ok: true
        };
    }

    var leftRes = leftPos();
    var rightRes = rightPos();

    console.log( leftRes, rightRes );
}

/**
 * For and other loop staements can have
 * label:
 * that allow us to break from deeply nested structures
 * break label;
 */
function labelUsage() {

    var i;
    var j;
    var k;

    outerLoop:
    for ( i = 0; i < 30; i += 1 ) {

        for ( j = 0; j < 10; j += 1 ) {

            for ( k = 0; k < 10; k += 1 ) {

                if ( i === 18 && j === 3 && k === 5 ) {
                    console.log( "Breaking from i, j, k: ", i, j, k );
                    break outerLoop;
                }
            }

            // Debug:
            // console.log( "j loop ", j, " finished" );
        }

        // Debug
        // console.log( "i loop ", i, " finished" );
    }
}

/**
 * Array special property "length" contains number always 1
 * larger than the highest integer subscript
 * Not the number of elements
 * Warning: sparse arrays
 */
function arrLengthValue() {

    arr = [ 1, 2, 3 ];
    arr[ 8 ] = 8;
    arr[ 45 ] = 45;

    console.log( "Array:" );
    console.log( arr );
    console.log( "Array.length: ", arr.length );
}
