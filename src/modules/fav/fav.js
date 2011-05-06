fast.modules.fav = fast.modules.fav || (function( window, undefined ){

	var controller = function( sb ){

		var model;
		var view;

		var onChange = function( data ){

			model.entries = data;
			model.notify();
		};

		var init = function(){
			model = sb.getModel();
			view = new sb.getView()( sb, model );
			view.init();
			sb.subscribe( fast.events.CHANGED, onChange );
		};

		var destroy = function(){};

		return ({
			init: init,
			destroy: destroy
		});
	};

	var view = function( sb, model ){

		var c;
		var tmpl;

		/**
		* Function: done
		*/
		var done = function( ev ){
			id = $(this).parent().parent().attr("id");
			sb.publish( fast.events.DONE, id );
		};
		
		/**
		* Function: undo
		*/
		var undo = function( ev ){
			id = $(this).parent().parent().attr("id");
			sb.publish( fast.events.UNDO, id );
		};
		
		/**
		* Function: favDisable
		*/
		var favDisable = function( ev ){
			id = $(this).parent().parent().attr("id");
			sb.publish( fast.events.UNFAVORED, id );
		};
		
		/**
		* Function: favEnable
		*/
		var favEnable = function( ev ){
			id = $(this).parent().parent().attr("id");
			sb.publish( fast.events.FAVORED, id );
		};
		
		/**
		* Function: select
		*/    
		var select = function( ev ){
			id = $(this).attr("id");
			model.selected[0] = id;
			model.notify();
			sb.publish( fast.events.SELECT, id );
    		};


		var init = function(){
			c = sb.getContainer();
			c.delegate( "button.due", "click", done );
			c.delegate( "button.done", "click", undo );
			c.delegate( "button.favorite", "click", favDisable );
			c.delegate( "li", "click", select );
			tmpl = sb.getTemplate("fav");
			model.subscribe( this );
		};

		var update = function(){
			c.empty();	
			sb.tmpl( tmpl, { header: sb._("Favorites"), entries: model.entries, selected: model.selected }).appendTo( c );
		};

		return ({
			init: init,   
			update: update
		});
	};

	var model = {
		entries : [],
		selected: ""
	};

	return ({
		controller: controller,
		view: view,
		model: model
	});

})( window );
