APP.MenuCollection = BBColl.extend({
	
    model: APP.MenuModel,
    url: function(){
	  return (!this.menuId)? '/demo-rest-services/public_html/index.php/api/menus' : '/demo-rest-services/public_html/index.php/api/menus/'+this.menuId;
  	},
    findByCreateDate: function(date){
    	var models = this.models;
    	var filteredResult = _.filter(models, function(v){
    		//YYYY-MM-DD
    		var dateToCompare = v.get('eventDate').journey.date.split(" ")[0];
    		return dateToCompare == date; 
    	});
    	return filteredResult;
    },
    findByMenuId: function(id){
    	var models = this.models;
    	var menu = _.find(models, function(num){
    		return num.id == id; 
    	});
    	return menu;
    }

  });

var menuCollection = new APP.MenuCollection();APP.RecipeCollection = BBColl.extend({
	
    model: APP.RecipeModel,
    url: function(){
	  return (!this.recipeId)? '/demo-rest-services/public_html/index.php/api/recipes' : '/demo-rest-services/public_html/index.php/api/recipes'+this.recipeId;
  	},
    findByRecipeId: function(id){
    	var models = this.models;
    	var menu = _.find(models, function(num){
    		return num.id === id; 
    	});
    	return menu;
    }

  });

var recipeCollection = new APP.RecipeCollection();