  
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
  
