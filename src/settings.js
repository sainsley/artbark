$(init)

var targets = {}

function init(){
	console.log('settings init')
	login()

	var groups = ['Friends', 'Mentors', 'Colleagues']
	for (var i = 0; i < groups.length; i++){
		var pill = $('<div class="pill">' + groups[i] + '</div>').attr('id', 'btn-' + groups[i].toLowerCase())
		pill.attr('data-group', groups[i].toLowerCase())
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
	
	$('#initial-list').droppable({
			accept: '#initial-list div',
			drop: onReturnGroup
	});
	
	$('.next').click(onSubmit)
}

function onSubmit(){
	var publics = $.map(targets, function(val, key){ if(val == 'public') return key })
	var privates = $.map(targets, function(val, key){ if(val == 'private') return key })
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/groups',
		data: JSON.stringify({
			email: userEmail,
			groups: { public: publics, private: privates }
		}),
		dataType: 'text',
		success: function(){ window.location = 'tags.html?userEmail=' + userEmail }
	})
	
	return false
}

function onReturnGroup(e, ui) {
	ui.draggable.draggable('option', 'revert', false)
	setTimeout(function(){ ui.draggable.draggable('option', 'revert', true) }, 1000)
}

function onDropGroup(e, ui){
	var target = $(this)
	var item = ui.draggable
	
	var itemName = item.data().group
	var parentName = $(target[0]).parent().attr('id')
	console.log('dropped', itemName, 'onto ', parentName)
	
	targets[itemName] = parentName.split('-')[0]

	//ui.draggable.position({ of: target, my: 'center', at: 'center' })
	console.log(target.position())
	ui.draggable.css('position', 'absolute');
	ui.draggable.offset({left: target.offset().left + 3, top: target.offset().top + 3 });
	ui.draggable.width(target.width());
	console.log(ui.draggable.position())
	ui.draggable.draggable('option', 'revert', false)
	setTimeout(function(){ ui.draggable.draggable('option', 'revert', true) }, 1000)
}

