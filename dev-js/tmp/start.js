function updateClassContainer(className){
	$('#app-container').attr("class","container-fluid " + className);	
};

var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
	  'menu/:menuId': 'showMenuById',	  	  
	  'menus': 'showAllMenus',
	  'menus/': 'showAllMenus',
	  'menus/page/:page': 'showAllMenusByPage',
	  
	  'create-menu': 'menuCreateForm',
	  'thankyou': 'thanksView',
	  	  
      // Default
      '*actions': 'defaultAction'
    },
    
    thanksView: function(){
    	updateClassContainer('thankyou');   
        Hero.showThanksBox();
        MidContent.showList();
    },
    
    menuCreateForm: function(){
    	updateClassContainer('create-menu');   
  	  	loader.randomRecipesForCreateMenu(menuCreateView);    	
    },
    
    showMenuById: function(menuId){
    	updateClassContainer('detail-menu');
    	loader.menuById(menuDetailView, {'menuId':menuId});
    },
    showAllMenus: function(){
    	this.navigate('menus/page/1', {trigger: true});
    },
    showAllMenusByPage: function(page){
    	updateClassContainer('all-menus');
        menusPerPage = $('#appContainer').data('menus-per-page');
    	$('#appContainer').data({'allMenus-page':page});
    	loader.allMenus(menuListView, {action:'allMenus',page:page, url:'#menus/page/1'}, {page:page,maxResults:menusPerPage});
    },
    
    defaultAction: function(actions){
    	updateClassContainer('home');
        menusPerPage = $('#appContainer').data('menus-per-page');
        menuCollection.menuId = false;
        mainView.render();
    	loader.allMenus(menuListView, {action:'home',page:1}, {page:1,maxResults:menusPerPage,orderBy:'m.id'});
    }
});

var app_router = new AppRouter;
$(function(){

	//here is the document ready callback
    Backbone.history.start();

});
