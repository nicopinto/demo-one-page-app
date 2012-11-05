APP.RecipeCollection = BBColl.extend({
	
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