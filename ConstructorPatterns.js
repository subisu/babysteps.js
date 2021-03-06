/**
 * Constructor function pattern example
 * Decorator example
 */
function constrFunc() {
    "use strict";

    var Floor = function __constructorFloor( isTechnical ) {

        this.isTechical = isTechnical;
        this.namingMask = "frrr";
    };

    Floor.prototype.setNamingMask = function __FloorProtSetNamingMask( newMask ) {

        this.namingMask = newMask;
    };

    Floor.prototype.printNamingMask = function __FloorProtPrintNamingMask() {

        console.log( this.namingMask );
    };

    // Decorator
    var InTestFloor = function( isTechical, numOfRooms ) {
        Floor.call( this, isTechical );
        this.numOfRooms = numOfRooms;

    };
    InTestFloor.prototype = Object.create( Floor.prototype );

    InTestFloor.prototype.printNamingMask = function __InTestProtPrintNamingMask() {

        console.log( "Inherited special call" );
        Floor.prototype.printNamingMask.call( this );
    };

    /////////////////////////////

    var f1 = new Floor( true );
    var f2 = new InTestFloor( false, 6 );

    f1.setNamingMask( "ffrr" );

    f1.setNamingMask.call( f2, "rrff" );
    f1.setNamingMask.apply( f2, [ "rffr" ] );

    f2.printNamingMask();
    console.log( f1, f2 );
}

/**
 * Object-only constructor pattern
 * Another approach to inheritance and prototyping
 */
function objOnlyPattern() {

    var PrototypeObj = {
        name: "default",
        init: function __PrototypeObjInit( name ) {
            this.name = name;
        },
        identify: function __PrototypeObjIdentify() {
            return "Name: " + this.name;
        }
    };

    var MainObj = Object.create( PrototypeObj );

    MainObj.subMethod = function __MainObjSubMethod() {

        console.log( "Identity - ", this.identify(), "." );
    };

    var sb1 = Object.create( MainObj );
    sb1.init( "MainObject1" );
    sb1.subMethod();
    console.log( sb1.identify() );

    for ( var i in PrototypeObj ) {
        console.log( PrototypeObj[ i ] );
    }

    // Warning - enumerable functions
    // See next example to see how we can make functions not enumerable

}

/**
 * Object definition with defineProperties
 * Prototyping
 * Inheritance
 */
function defPrtConstructor() {

    var floor = {
        _dateConstructed: "1/2/3",
        "***": "123",
        title: "My Title",
        description: "My Description"
    };

    // Single defineProperty. Getter and setter
    Object.defineProperty( floor, "dateConstructed", {
       get: function() {

           // Log access to property
           return this._dateConstructed;
       },
       set: function( newValue ) {

           // Log and check
           this._dateConstructed = newValue;
       }
    } );

    Object.defineProperty( floor, "toString", {
        value: function __FloorToStringMethod() {
            return this.title + " " + this.description;
        },
        writable: false,
        enumerable: false,
        configurable: false
    } );

    // Defining multiple properties at the same time
    Object.defineProperties( floor, {
        "somePrt": {
            value: "test 1",
            writable: false,
            enumerable: true,
            configurable: false
        },
        "some other": {
            value: "test 2",
            writable: false,
            enumerable: false,
            configurable: false
        }
    } );

    // Prototype inheritance
    var hiddenFloor = Object.create( floor );
    Object.defineProperty( hiddenFloor, "toString", {
        value: function __HiddenFloorToStringMethod() {
            return this.title + " is hidden";
        },
        writable: false,
        enumerable: false,
        configurable: false
    } );

    console.log( hiddenFloor.toString() );

    floor.dateConstructed = "2/3/4";
    floor[ "***" ] = "5/6/7";

    for ( var floorPrts in floor ) {

        console.log( floorPrts, floor[ floorPrts ],
                    Object.getOwnPropertyDescriptor( floor, floorPrts ) );
    }
}

/**
 * Factory function example
 */
function factoryEx() {

    function add( num ) {

        var numBeingAdded = num;

        function conAdder ( num ) {

            return num + numBeingAdded;
        }

        return conAdder;
    }

    var add5 = add( 5 );
    console.log( add5( 5 ) );

    var digitName = ( function() {
        var names = [ "zero", "one", "two" ];

        return function( num ) {

            return names[ n ];
        };
    }() );

    console.log( digitName( 2 ) );

}

/**
 * Singleton pattern with public and private
 * properties and methods
 */
var mySingleton = ( function SingletonPattern( callBackFcn ) {

    var privateVar = "private";

    function privateMethod() {
        console.log( "private method" );
    }

    function publicMethod() {
        privateMethod();
        if ( typeof callBackFcn == "function" ) {

        callBackFcn();
        }
    }

    var publicAPI = {

        publicVar: "123",

        publicMethod: publicMethod
    };

    return publicAPI;
} )();

/**
 * Module pattern with inheritance example
 */
function modulePattern() {

    function objProt( name ) {

        var privateVar = "private";

        function privateMethod() {
            console.log( "private method" );
            console.log( publicAPI.name );
        }

        function publicMethod() {
            privateMethod();
            console.log( "Public method calling private method" );
        }

        var publicAPI = {
            name: name,
            publicMethod: publicMethod
        };

        return publicAPI;
    }

    function objMain( name ) {
        var that = objProt( name );

        that.test = function( testName ) {
            return testName === this.name;
        };

        return that;
    }

    var mainObj = objMain( "test" );
    console.log( mainObj.test( "test" ) );
    mainObj.publicMethod();
}

/**
 * Flyweight concept
 */

function flyweightEx() {

    var Task = function( data ) {
        this.flyweight = FlyweightFactory.get( data.project, data.priority,
                                                data.user, data.completed );
        this.name = data.name;
    };

    Task.prototype.getPriority = function() {
        return this.flyweight.priority;
    };

    function Flyweight( project, priority, user, completed ) {
        this.priority = priority;
        this.project = project;
        this.user = user;
        this.completed = completed;
    }

    var FlyweightFactory = ( function() {
        var flyweights = {};

        var get = function( project, priority, user, completed ) {
            if ( !flyweights[ project + priority + user + completed ] ) {
                flyweights[ project + priority + user + completed ] =
                    new Flyweight( project, priority, user, completed );
            }
            return flyweights[ project + priority + user + completed ];
        };

        var getCount = function() {
            var count = 0;
            for ( var f in flyweights ) {
                count++;
            }

            return count;
        };

        return {
            get: get,
            getCount: getCount
        };
    } )();

    function TaskCollection() {
        var tasks = {};
        var count = 0;

        var add = function( data ) {

            tasks[ data.name ] = new Task( data );
            count++;
        };

        var get = function( name ) {
            return tasks[ name ];
        };

        var getCount = function() {
            return count;
        };

        return {
            add: add,
            get: get,
            getCount: getCount
        };
    }

    var tasks = new TaskCollection();

    var projects = [ "none", "courses", "training", "project" ];
    var priorities = [ 1, 2, 3, 4, 5 ];
    var users = [ "Jon", "Erica", "Amanda", "Nathan" ];
    var completed = [ true, false ];

    var initialMemory = process.memoryUsage().heapUsed;

    for ( var i = 0; i < 10000; i++ ) {
        tasks.add( {
            name: "task" + i,
            priority: priorities[ Math.floor( ( Math.random() * 5 ) ) ],
            project: projects[ Math.floor( ( Math.random() * 4 ) ) ],
            user: users[ Math.floor( ( Math.random() * 4 ) ) ],
            completed: completed[ Math.floor( ( Math.random() * 2 ) ) ]
        } );
    }

    var afterMemory = process.memoryUsage().heapUsed;
    console.log( "used memory " + ( afterMemory - initialMemory ) / 1000000 );

    console.log( "tasks: " + tasks.getCount() );
    console.log( "flyweights: " + FlyweightFactory.getCount() );

}

/**
 * Facade example
 */

function facadeEx() {

    var Task = function __TaskConstructor( data ) {
        this.name = data.name;
        this.priority = data.priority;
        this.project = data.project;
        this.user = data.user;
        this.completed = data.completed;
    };

    var TaskService = ( function __TaskServiceConstructor() {
        return {
            complete: function( task ) {
                task.completed = true;
                console.log( "completing task: " + task.name );
            },
            setCompleteDate: function( task ) {
                task.completedDate = new Date();
                console.log( task.name + " completed on " + task.completedDate );
            },
            notifyCompletion: function( task, user ) {
                console.log( "Notifying " + user + " of the completion of " + task.name );
            },
            save: function( task ) {
                console.log( "saving Task: " + task.name );
            }
        };
    } )();

    var TaskServiceWrapper = ( function __TaskServiceWrapperConstructor() {

        var completeAndNotify = function( task ) {
            TaskService.complete( myTask );
            if ( myTask.completed === true ) {
                TaskService.setCompleteDate( myTask );
                TaskService.notifyCompletion( myTask, myTask.user );
                TaskService.save( myTask );
            }
        };
        return {
            completeAndNotify: completeAndNotify
        };
    } )();

    var myTask = new Task( {
        name: "MyTask",
        priority: 1,
        project: "Courses",
        user: "Jon",
        completed: false
    } );

    // Console.log(myTask);
    TaskServiceWrapper.completeAndNotify( myTask );

    console.log( myTask );

}
