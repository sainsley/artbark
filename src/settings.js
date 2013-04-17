$(init)

function init(){
	console.log('settings init')

	var groups = ['Friends', 'Mentors', 'Colleagues']
	for (var i = 0; i < groups.length; i++){
		var pill = $('<div class="pill">' + groups[i] + '</div>').attr('id', 'btn-' + groups[i].toLowerCase())
		pill.appendTo( '#initial-list' )
		pill.draggable({
			containment: '#privacy-area',
			stack: '#initial-list div',
			cursor: 'move',
			revert: true
		})
	}

	for(var i = 0; i < groups.length * 2; i++){
		$('<div class="drop-spot pill">drag group name here</div>').appendTo(i % 2 ? '#public-list' : '#private-list').droppable({
			accept: '#initial-list div',
			drop: onDropGroup
		})
	}
}

function onDropGroup(e, ui){
	var target = $(this)
	var item = ui.draggable
	
	console.log('dropped', item, 'onto ', target)

	ui.draggable.position({ of: target, my: 'center', at: 'center' })
	ui.draggable.draggable('option', 'revert', false)
	setTimeout(function(){ ui.draggable.draggable('option', 'revert', true) }, 1000)
}

