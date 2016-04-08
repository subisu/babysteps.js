var ScopeLessons = require( "./Scope.js" );

for ( var lesson in ScopeLessons ) {
    if ( typeof ScopeLessons[ lesson ] === "function" ) {
        console.log( "Executing lesson: ", lesson );
        ScopeLessons[ lesson ]();
        console.log( "End of lesson: ", lesson );
        console.log( "**************************" );
    }
}
