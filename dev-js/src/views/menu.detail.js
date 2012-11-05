  APP.MenuDetailView = BBView.extend({
    el: $("#menuDetail"),
    template: _.template($("#menuDetailTemplate").html()),
    render: function(params){
	  log('  APP.MenuDetailView.render')	  
	  var data = {
	     _:_,
	     menu: params.menu
	  };
	  var t = this.template(data);
      this.$el.html(t);
      MidContent.showDetail();
    }
  });
  
  var menuDetailView = new APP.MenuDetailView;