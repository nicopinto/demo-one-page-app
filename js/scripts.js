/**
* Here are the scripts that the app will load
*/

var libFolder = 'js/libs/', libDevFolder = 'dev-js/libs/',
	sourceDevFolder = 'dev-js/src/', sourceFolder = 'js/';

var scripts = {
	'dev':{
		'libs':[
		        libFolder + 'jquery-1.8.2.min.js',
		        libDevFolder + 'json2.min.js',
		        libDevFolder + 'underscore-1.4.2.js',
		        libDevFolder + 'backbone-0.9.2.min.js',
		        libDevFolder + 'modernizr-2.6.2.min.js',
		        libDevFolder + 'bootstrap.min.js'
		        ],
		'src':[
		        sourceDevFolder + 'helpers/log.js',
		        sourceDevFolder + 'helpers/encoding.js',
		        sourceDevFolder + 'setup.js',
		        sourceDevFolder + 'models/menu.js',
		        sourceDevFolder + 'models/recipe.js',
		        sourceDevFolder + 'collections/menu.collection.js',
		        sourceDevFolder + 'collections/recipe.collection.js',
		        sourceDevFolder + 'utils/box.js',
		        sourceDevFolder + 'utils/loader.js',
		        sourceDevFolder + 'views/menu.detail.js',
		        sourceDevFolder + 'views/menu.list.js',
		        sourceDevFolder + 'views/menu.new.js',
		        sourceDevFolder + 'views/menu.create.js',
		        sourceDevFolder + 'views/main.js',
		        sourceDevFolder + 'router.js',
		        sourceDevFolder + 'ready.js'
		       ]
	},
	'prod':{
		'libs':[
		        libFolder + 'jquery-1.8.2.min.js',
		        libFolder + 'jquery.plugins.js',
		        libFolder + 'backbone.js'
		        ],
		'src':[
		        sourceFolder + 'all.0005.min.js'
		       ]
	}
};