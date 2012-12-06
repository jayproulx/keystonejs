/**
 * Welcome to Keystone!
 *
 * Keystone is meant to provide enough code to standardize on implementation patterns, without requiring any other
 * dependencies.  Using Keystone should allow the developer to standardize on Keystone patterns on a project without
 * being required to use all of the extra bells and whistles that you'll find in Arch.
 *
 * http://github.com/pollensoft/archjs
 *
 * Much of the inspiration of this project came from Backbone, and it strives to be Backbone compatible as it has many
 * great features.  But Backbone is also missing a proper inheritance heirarchy, and depends heavily on jQuery and
 * Underscore which makes it unwieldy on lightweight projects.
 *
 * http://www.backbonejs.org
 *
 * Keystone is self-contained and is meant to support other frameworks.
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
	 * @type {Class}
	 */
	var Base = Keystone.Base = function()
	{
		return this;
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
			 * Add a callback for (a) specific event(s) to this event dispatcher.  Listen to multiple events with the
			 * same callback by stringing the events together separated by spaces.
			 *
			 * @param events String, multiple events can be separated by a space to add multiple callbacks.
			 * @param callback Function
			 * @param context Object, "this" when callback is executed.
			 * @return {Keystone.EventDispatcher}
			 */
			on: function( events, callback, context )
			{
				if( !callback ) return this;

				events = events.split( EventDispatcher.SPLIT_ON );
				this.callbacks = this.callbacks || {};

				var event, callbacks;
				while( event = events.shift() )
				{
					callbacks = this.callbacks[event] = this.callbacks[event] || [];

					callbacks.push( { callback: callback, context: context } );
				}

				return this;
			},

			/**
			 * Remove a callback for (a) specific event(s) from this event dispatcher.  An undefined argument indicates
			 * that you would like to match the other arguments inclusively. If all three arguments are undefined, remove
			 * all event listeners.
			 *
			 * @param events String, multiple events can be separated by a space to remove multiple events
			 * @param callback Function
			 * @param context Object
			 * @return {Keystone.EventDispatcher}
			 */
			off: function( events, callback, context )
			{
				if( !this.callbacks )
				{
					return this;
				}

				// turn all events off if all parameters are undefined
				if( !events && !callback && !context )
				{
					this.callbacks = undefined;
					return this;
				}

				var callbacks, event, cb, idx;

				events = events ? events.split( EventDispatcher.SPLIT_ON ) : this.callbackEvents( this.callbacks );

				while( event = events.shift() )
				{
					callbacks = this.callbacks[event];

					if( !callbacks ) continue;

					// if we have an event, but no callback or context, remove all callbacks for this event
					if( callbacks && !callback && !context )
					{
						this.callbacks[event] = undefined;
						continue;
					}

					// loop backwards because we're going to splice out elements as we go
					idx = callbacks.length;
					while( idx-- )
					{
						cb = callbacks[idx];

						// if either callback or context matches, remove it
						if( (!callback || callback === cb.callback) && (!context || context === cb.context) )
						{
							callbacks.splice( idx, 1 );
						}
					}
				}

			},

			// TODO: Implement trigger
			trigger: function()
			{

			},

			callbackEvents: function( callbacks )
			{
				if( Object.keys )
				{
					return Object.keys( callbacks );
				}

				var keys = [], prop;
				for( prop in callbacks )
				{
					if( callbacks.hasOwnProperty( prop ) )
					{
						keys.push( prop );
					}
				}

				return keys;
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
	var define;
	if( define && typeof define == "function" )
	{
		define( "Keystone", [], function()
		{
			return root.Keystone;
		} );
	}

})( window );