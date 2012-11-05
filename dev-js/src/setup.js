/**
* A One Page App
* @version 1.0
* @author: Nicolas.Pinto
*/

var appContext = "/demo-one-page-app";

//shortcuts for some main objects
var	BBModel = Backbone.Model,
	BBColl = Backbone.Collection,
	BBView = Backbone.View;

//namespaces
window.APP = {}; APP.Events = {};

//extend the events
_.extend(APP.Events, Backbone.Events);