/**
 * Command pattern makes it easier to control methods executed
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

/**
 * Observer pattern in action
 */
function observerEx() {

    // Constructor pattern for generic task

    var Task = function( data ) {

        this.name = data.name;
        this.priority = data.priority;
        this.project = data.project;
        this.user = data.user;
        this.completed = data.completed;
    };

    Task.prototype.complete = function() {
        console.log( "completing task: " + this.name );
        this.completed = true;
    };

    Task.prototype.save = function() {
        console.log( "saving Task: " + this.name );
    };

    // Deploying services

    var notificationService = function() {
        var message = "Notifying ";
        this.update = function( task ) {
            console.log( message + task.user + " for task " + task.name );
        };
    };

    var loggingService = function() {
        var message = "Logging ";

        this.update = function( task ) {
            console.log( message + task.user + " for task " + task.name );
        };
    };

    var auditingService = function() {
        var message = "Auditing ";

        this.update = function( task ) {
            console.log( message + task.user + " for task " + task.name );
        };
    };

    // Observer object

    function ObserverList() {
        this.observerList = [];
    }

    ObserverList.prototype.add = function( obj ) {
        return this.observerList.push( obj );
    };

    ObserverList.prototype.get = function( index ) {
        if ( index > -1 && index < this.observerList.length ) {
            return this.observerList[ index ];
        }
    };

    ObserverList.prototype.count = function() {
        return this.observerList.length;
    };

    ObserverList.prototype.removeAt = function( index ) {
        this.observerList.splice( index, 1 );
    };

    ObserverList.prototype.indexOf = function( obj, startIndex ) {
        var i = startIndex;

        while ( i < this.observerList.length ) {
            if ( this.observerList[ i ] === obj ) {
                return i;
            }
            i += 1;
        }

        return -1;
    };

    // Decorator over task

    var ObservableTask = function( data ) {
        Task.call( this, data );
        this.observers = new ObserverList();
    };

    ObservableTask.prototype.addObserver = function( observer ) {
        this.observers.add( observer );
    };

    ObservableTask.prototype.removeObserver = function( observer ) {
        this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
    };

    ObservableTask.prototype.notify = function( context ) {
        var observerCount = this.observers.count();
        for ( var i = 0; i < observerCount; i += 1 ) {
            this.observers.get( i )( context );
        }
    };

    ObservableTask.prototype.save = function() {
        this.notify( this );
        Task.prototype.save.call( this );
    };

    // Testing

    var task1 = new ObservableTask( {
        name: "demo task",
        user: "user"
    } );

    var not = new notificationService();
    var ls = new loggingService();
    var audit = new auditingService();

    task1.addObserver( not.update );
    task1.addObserver( ls.update );
    task1.addObserver( audit.update );

    task1.save();

    task1.removeObserver( audit );
    task1.save();

}
