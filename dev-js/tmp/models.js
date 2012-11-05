APP.MenuModel = BBModel.extend({
    defaults: {
	  title: '',
	  recipes:[],
	  created:null
    },
    
    initialize: function(){
    	
    },
    validate: function(attrs) {
      if (attrs.title == '') {
	    return "You have to set the name in the menu!";
	  }
	},
    
    getAppetizer: function(){
    	return this.get("recipes")[0];
    },
    getMainDish: function(){
    	return this.get("recipes")[1];
    },
    getDessert: function(){
    	return this.get("recipes")[2];
    },
    
    getCid: function(){
    	return  this.cid;
    },
        
    getNiceDate: function(){
    	var journey = this.get("created"),
    		journeySplit = journey.date.split(" ")[0],
    		journeyData = journeySplit.split("-"),
    		months = {"01":"Enero","02":"Febrero","03":"Marzo","04":"Abril","05":"Mayo","06":"Junio","07":"Julio","08":"Agosto","09":"Septiembre","10":"Octubre","11":"Noviembre","12":"Diciembre"};
    	return journeyData[2] + " de " + months[journeyData[1]];
    }

  });APP.RecipeModel = BBModel.extend({
	
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