

APP.MainView = BBView.extend({
    el: $("#appContainer"),
    events: {
	  "click #loadMoreMenues"    : "loadMoreMenus",
	  'click #createAgainBtn': 'showCreateBox',
	},
    loadMoreMenus: function(e){
	  var actualPage = parseInt($('#appContainer').data("allMenus-page"));
	  var newRoute = '#menus/page/';
	  window.location = newRoute + (actualPage+1);
    },
	showCreateBox: function(){
		app_router.navigate('create-menu', {trigger:true});
	},
	
    initialize: function(){
		log('APP.MainView.init')
	  this.collection = menuCollection;
  	},
  	
    render: function(params){
		log('APP.MainView.render')
	  $('.details').show();
	  var menuModels = this.collection.models;
	  var data = {
	     _:_,
	     videosRanked: menuModels
	  };
	  //var t = this.template(data);
      //this.el.html(t);
	  Hero.showWelcomeBox();
	  MidContent.showList();
    }
});
  
var mainView = new APP.MainView();