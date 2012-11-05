  APP.MenuCreateView = BBView.extend({
    el: $("#appContainer .hero-unit"),
    template: _.template($("#menuCreateDishesTemplate").html()),

    events: {
	  'click .refresh-btn': 'refreshDish',
	  'submit #formCreate': 'processCreation',
	},
	  	
  	processCreation: function(){
  		log("processing...");
  		var $formCreate = $('#formCreate'),
  			$input = $formCreate.find('.input-large'),
  			dishes = $('#createBox').find('.dishes article'),
  			$appetizer = $(dishes[0]), $mainDish = $(dishes[1]), $dessert = $(dishes[2]);
  		
  		if($input.val() == ''){
			alert("You have to set the name in the menu!");
		  };
  		
  		var data = {
  			title: $input.val(),
  			recipes:[ 
  			    {
  			    	id:parseInt($appetizer.attr("data-recipe-id")),
  			    	url:$appetizer.attr("data-base-url")
  			    },
  			    {
  			    	id:parseInt($mainDish.attr("data-recipe-id")),
  			    	url:$mainDish.attr("data-base-url")
  			    },
  			    {
  			    	id:parseInt($dessert.attr("data-recipe-id")),
  			    	url:$dessert.attr("data-base-url")
  			    }
  			]
  		};
  		/*var request = $.ajax({
		  url: "/demo-rest-services/public_html/index.php/api/menus",
		  type: "POST",
		  data: data,
		  dataType: "json"
		});
  		request.done(function(response) {
  			if(response.msg==="ok"){
  				var menuObject = response.menu[0],
  					menuModel = new APP.MenuModel(menuObject),
  					view = new APP.MenuNewView({model:menuModel});
  				view.render();
  			}
  		});

  		request.fail(function(jqXHR, textStatus) {
  		  alert( "Request failed: " + textStatus );
  		});*/
  		
  		this.menuCollection.create(data);
  			
  		return false;
  	},
  	
  	appendNewMenu:function(menuModel){
  		log("appendNewMenu")
  		log(menuModel)
		var view = new APP.MenuNewView({model:menuModel});
		view.render();
  	},
	
  	refreshDish: function(e){
  		e.preventDefault();
  		e.stopPropagation();
  		var $el = $(e.currentTarget), type = $el.data("type"), _this = this;
  		loader.randomRecipe(_this, {randomBy:type});
  	},
  	
  	initialize: function(){
		log('APP.MenuCreateView.init')
  	  this.recipeCollection = recipeCollection;
  	  this.menuCollection = menuCollection;
  	  this.menuCollection.on("add", this.appendNewMenu, this);
	  this.menuCollection.on("error", function(model, error) {
		//if somethign happen here
		  if(jsenv==="dev"){
			  $('#appContainer').html(error.responseText)
		  }
	  });
		
  	},
  	render: function(params){
		log('APP.MenuCreateView.render')
	  $('.details').hide();
  	  this.$el.find('.input-large').val('');

  	  var recipes = params.recipes,
	  	  data = {
	  	     _:_,
	  	    recipes: recipes
	  	  };
  	  	  
  	  var t = this.template(data);
      this.$el.find('.dishes').html(t);
      Hero.showCreateBox();
  	},
  	changeRecipe: function(data){
  		if(data){
	  		var imgSrc = data.recipe.getUrlThumb(), recipeId = data.recipe.get("id");
	  		switch(data.randomBy){
	  		case "appetizer":
	  			$('.dishes .appetizer').attr('data-recipe-id',recipeId).find('img').attr('src',imgSrc);
	  			break;
	  		case "main dish":
	  			$('.dishes .main-dish').attr('data-recipe-id',recipeId).find('img').attr('src',imgSrc);
	  			break;
	  		case "dessert":
	  			$('.dishes .dessert').attr('data-recipe-id',recipeId).find('img').attr('src',imgSrc);
	  			break;
	  		}
  		}
  	}
  });

  var menuCreateView = new APP.MenuCreateView;
  
  