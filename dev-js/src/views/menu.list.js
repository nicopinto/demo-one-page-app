  APP.MenuListView = BBView.extend({
    el: $("#menuList"),
    template: _.template($("#menuListTemplate").html()),
    events: {
    },
    initialize: function(){
		log('APP.MenuListView.init')
  	},
    render: function(params){
		log('APP.MenuListView.render')
	  $('.details').hide();
	  
	  var menuModels = params.menuModels,
	  	menusPerPage = $('#appContainer').data("menus-per-page");
	  	  
	  var data = {
	     _:_,
	     menuModels: menuModels
	  };
	  	  
	  var t = this.template(data);
      this.$el.html(t);
      
    }
  });
  
  var menuListView = new APP.MenuListView();
  