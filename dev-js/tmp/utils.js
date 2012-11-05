  
  var $containerAlert = $("#alertContainer");
  
  var box = {
	show: function(msg){
	  if(!!this.init){
		  this.init();
	  }
	  $containerAlert.stop().hide();
	  var $this = this,
	  	$el = $this.$el;
	  if(!!msg) $el.find('p').html(msg);
	  $el.stop().fadeIn();
	  if(this.id!='loaderBox'){
		$el.find('a.close').off('click').on('click', function(){
		  $this.hide();  
		});
	  }
	},
	hide: function(){
	  this.$el.stop().fadeOut();
	  $containerAlert.stop().fadeIn();
	}
  };

  var errorBox = {
	id: 'errorBox',
    $el: $('#errorBox'),
  };
  var alertBox = {
	id: 'alertBox',
    $el: $('#alertBox'),
  };
  var loaderBox = {
	id: 'loaderBox',
    $el: $('#loaderBox'),
  };
  
  var boxes = {
	base: box,
    error: $.extend(errorBox, box),
    alert: $.extend(alertBox, box),
    loader: $.extend(loaderBox, box)
  };
  

  var Hero = {
  	hideAllBoxes: function(){
  		$('.hero-unit .box').hide();
  	},
  	showWelcomeBox: function(){
  		this.hideAllBoxes();
  		$('#welcomeBox').fadeIn();
  	},
  	showCreateBox: function(){
  		this.hideAllBoxes();
  		$('#createBox').fadeIn();
  	},
  	showThanksBox: function(){
  		this.hideAllBoxes();
  		$('#thanksBox').fadeIn();  		
  	}
  };
  
  var MidContent = {
	hide: function(callback){
	  $('.mid-content').hide();
  	},
    showList: function(callback){
  	  this.hide();
  	  $('#menuList').fadeIn('normal', callback);
	},
    showDetail: function(callback){
  	  this.hide();		
  	  $('#menuDetail').fadeIn('normal', callback);
	}
  };
  
/**
 * Backbone loader - to fetch collection and have a cache in memory with them
 * @author Nico Pinto
 */
var loader = {
		
  singleMemory: {},
  allMenusMemory: {},
  recipes:{},
  
  singleItem: function(frontParams, ajaxParams){
	  
	  var view = frontParams.view, viewArguments=frontParams.viewArguments, collectionData=frontParams.collectionData;
	  var coll = ajaxParams.coll, cache=ajaxParams.cache, actualPage=ajaxParams.actualPage;
	  if( !cache['page'+actualPage] || (cache['page'+actualPage] && coll.refresh) ){
		  boxes.loader.show();
		  recipeCollection.fetch({
			data: collectionData,
			error: function(xhr){
				if(ajaxParams.onError) ajaxParams.onError(xhr);
				if(viewArguments.url) window.location = viewArguments.url;
				boxes.loader.hide();
			},
			success:function(collection,response){ 
				viewArguments.menuModels = cache['page'+actualPage] = collection.models; 
				view.render(viewArguments);
				boxes.loader.hide();
			}
		});
		  
	  }else{
		viewArguments.menuModels = cache['page'+actualPage]; 
		view.render(viewArguments);
	  }
	  
  },
  
  singlePaginatedAction: function(frontParams, ajaxParams){
	  log("loader.singlePaginatedAction")
	  var view = frontParams.view, viewArguments=frontParams.viewArguments, collectionData=frontParams.collectionData;
	  var coll = ajaxParams.coll, cache=ajaxParams.cache, actualPage=ajaxParams.actualPage;
	  if( !cache['page'+actualPage] || (cache['page'+actualPage] && coll.refresh) ){
		  boxes.loader.show();
		  
		coll.fetch({
			data: collectionData,
			error: function(xhr){
				if(ajaxParams.onError) ajaxParams.onError(xhr);
				if(viewArguments.url) window.location = viewArguments.url;
				boxes.loader.hide();
			},
			success:function(collection,response){
				  log("loader.singlePaginatedAction.success")
				viewArguments.menuModels = cache['page'+actualPage] = collection.models; 
				view.render(viewArguments);
				boxes.loader.hide();
			}
		});
		
	  }else{
			viewArguments.menuModels = cache['page'+actualPage]; 
			view.render(viewArguments);
	  }
  },
 
  randomRecipe: function(view, data){
	var type = data.type, cache=this.recipes;
	boxes.loader.show();
	recipeCollection.fetch({
		data: data,
		success:function(collection, response){
			data.recipe = collection.models[0];
			var id = data.recipe.get("id");
			view.changeRecipe(data);
    		cache['recipe'+id] = data.recipe;
			boxes.loader.hide();
		}
	});
  },
  
  randomRecipesForCreateMenu: function(view){
	  var cache = this.recipes;
	boxes.loader.show();
	var recipes = {};
	recipeCollection.fetch({
		data: {randomBy:"appetizer"},
		success:function(collection, response){
			recipes.appetizer = collection.models[0];
			var id = recipes.appetizer.get("id");
    		cache['recipe'+id] = recipes.appetizer;
    		collection.fetch({
    			data: {randomBy:"main dish"},
    			success:function(collection, response){
    				recipes.mainDish = collection.models[0];
    				var id = recipes.mainDish.get("id");
    	    		cache['recipe'+id] = recipes.mainDish;
    	    		collection.fetch({
    	    			data: {randomBy:"dessert"},
    	    			success:function(collection, response){
    	    				recipes.dessert = collection.models[0];
    	    				var id = recipes.dessert.get("id");
    	    	    		cache['recipe'+id] = recipes.dessert;
    	    	    		view.render({recipes:recipes});
    	    				boxes.loader.hide();
    	    			}
    	    		});
    			}
    		});
		}
	});
  },
  
  allMenus: function(view, viewArguments, collectionData){
	  log("loader.allMenus")
	  var allVideosCache = this.allMenusMemory,
	  	frontParams = {'view':view, 'viewArguments':viewArguments,'collectionData':collectionData},
	  	ajaxParams = {'coll':menuCollection, 'cache': allVideosCache, 'actualPage':collectionData.page};
	  this.singlePaginatedAction(frontParams, ajaxParams);
  },
  
  menuById: function(view, data){
	var id = data.menuId, coll = menuCollection, cache=this.singleMemory;
	coll.menuId = id;
	if(!cache['menu'+id]){
		boxes.loader.show();
		coll.fetch({
			success:function(collection,response){
				data.menu = collection.models[0];
				view.render(data);
	    		cache['menu'+id] = data.video;
				boxes.loader.hide();
			}
		});
	}else{
		data.video = cache['menu'+id];
		log(data.menu)
		view.render(data);
	}
  }
  
};
