  APP.MenuNewView = BBView.extend({
    el: $("#menuList"),
    template: _.template($("#menuNewTemplate").html()),
    getHtml: function(){
  	  var data = {
  	     _:_,
  	     menu: this.model
  	  };
  	  	  
  	  return this.template(data);
    },
    render: function(){
	  	  log('  APP.MenuNewView.render')	  
	  var data = {
	     _:_,
	     menu: this.model
	  };
	  var t = this.template(data);
      this.$el.prepend(t).slideDown();
      
      app_router.navigate('thankyou', {trigger:true});
      
    }
  });
  
  