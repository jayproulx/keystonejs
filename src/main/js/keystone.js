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
	Base.extend = function( staticProperties, localProperties )
	{
		localProperties = arguments.length == 1 ? staticProperties : localProperties;
	};


	var ModelBase = Keystone.ModelBase = Base.extend({

	});

	/**
	 * Make Keystone Require.js / AMD friendly.
	 */
	if(define && typeof define == "function")
	{
		define("Keystone", [], function()
		{
			return root.Keystone;
		});
	}


})( this );