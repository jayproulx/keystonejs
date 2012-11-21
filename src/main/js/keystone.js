/**
 * Welcome to Keystone!
 *
 * Keystone is meant to provide enough code to standardize on implementation patterns, without requiring any other
 * dependencies.  Using Keystone should allow the developer to standardize on Keystone patterns on a project without
 * being required to use all of the
 */
(function( root )
{
	if( !root.Keystone )
	{
		root.Keystone = {};
	}

	/**
	 * Base can also be used as a base class for non-Keystone classes.  Please also feel free to extend other Keystone
	 * classes, as they all inherit this method.
	 *
	 * @type {Function}
	 */
	var Base = Keystone.Base = function()
	{

	};

	/**
	 * Base.extend provides a common inheritance pattern for all Keystone classes.
	 *
	 * Not all classes end up with staticProperties properties, but when they do, convention typically puts them at the top of
	 * the file.  Keystone is no different.  If you have Static properties to apply to your class, they will be
	 * contained in the first object passed to extend.  If you only pass one object to extend, Base will use it for
	 * localProperties properties and methods.
	 *
	 * Thanks to backbone.js (http://www.backbonejs.org for code and inspiration)
	 *
	 * @param staticProperties (optional) Properties or methods that will be applied directly to the class
	 * @param localProperties Properties or methods that will be added to the prototype
	 */
		// TODO: Implement this method
	Base.extend = function( staticProperties, localProperties )
	{
		localProperties = arguments.length == 1 ? staticProperties : localProperties;
	};

	/**
	 * EventDispatcher is a lightweight event dispatcher that can send messages between loosely coupled code.
	 *
	 * @type {Keystone.EventDispatcher}
	 */
	var EventDispatcher = Keystone.EventDispatcher = Base.extend(
		{
			SPLIT_ON: /s+/g
		},
		{
			callbacks: {},

			/**
			 * Add a callback for a specific event to this event dispatcher.
			 *
			 * @param events String
			 * @param callback Function
			 * @param context Object
			 * @return {Keystone.EventDispatcher}
			 */
			on: function( events, callback, context )
			{
				if( !callback ) return this;

				events = events.split( EventDispatcher.SPLIT_ON );
				this.callbacks = this.callbacks || {};

				var event, calls, last;
				while( event = events.shift() )
				{
					calls = this.callbacks[event] = this.callbacks[event] || { last: {} };

					callback = calls.last;
					callback.next = last = {};
					callback.context = context;
					callback.callback = callback;

					calls = { last: last, next: calls ? calls.next : callback };
				}

				return this;
			},

			off: function( events, callback, context )
			{

			}
		}
	);

	/**
	 *
	 *
	 * @type {Keystone.ModelBase}
	 */
	var ModelBase = Keystone.ModelBase = Base.extend( {

	} );

	/**
	 * Make Keystone Require.js / AMD friendly.
	 */
	if( define && typeof define == "function" )
	{
		define( "Keystone", [], function()
		{
			return root.Keystone;
		} );
	}

})( this );