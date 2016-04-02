/**
 * Constructor pattern makes it easier to control methods executed
 * on objects.
 * TODO: Add example of logging or archiving methods with object state for each call
 */
function CommandPattern() {

    var repo = {
        select: function __repoSelect( id ) {

            console.log( "Getting task " + id );

            return {
                name: "new task from db"
            };
        },

        save: function __repoSave( task ) {

            console.log( "Saving " + task.name + " to the db" );
        }

    };

    repo.execute = function( name ) {

        var args = Array.prototype.slice.call( arguments, 1 );

        if ( repo[ name ] ) {
            return repo[ name ].apply( repo, args );
        }

        return false;
    };

    var task = repo.execute( "select", 1 );
    repo.execute( "save", task );
    console.log( task );
}
