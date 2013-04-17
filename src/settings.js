$(init)

function init(){
	console.log('settings init')
	
	$('.setting-list').sortable()
	$('.pill').draggable({
		//containment: '#privacy-area',
		connectToSortable: ".setting-list",
		drop: function(e, ui){
			ui.draggable.detach();
		}
	})
	
	
}