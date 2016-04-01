/**
 * Numerical issues with precision
 */
function numIssuesPrecision() {

    var total = 3.3 + 5.1;
    console.log( total ); //8.399999999999999
    console.log( total.toFixed( 2 ) );
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
 * Tricky comparrator conversion
 * Expected: value converted to true or falce
 * Real: Boolean converted to value 1 or 0
 * Caution.
 */
function compBehavior() {

    console.log( "true == 1 : ", true == 1 );
    console.log( "true == 2 : ", true == 2 );
    console.log( "true === 2 : ", true === 2 );
}
