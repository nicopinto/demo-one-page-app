APP.RecipeModel = BBModel.extend({
	
	defaults: {
		"name":"",
		"url":"",
		"type":"",
		"menu":null
	},
	
	initialize: function(data){
		this.set({
			
		});
	},
	
	getUrlThumb: function(){
		//214x164
		var url = this.get("url") + "214x164.jpg";
		return url;
	},

	getUrlBig: function(){
		//590x352
		var url = this.get("url") + "590x352.jpg";
		return url;
	},
	
	validate: function(attrs) {
		if (!attrs.type) {
			return "This recipe needs a type!";
		}
	},
	
	clear: function(){
		this.destroy();
		this.view.remove();
	}
	
});