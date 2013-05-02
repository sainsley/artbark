$(init)

var tags = []

function init(){
	$('#tags').typeahead({
		source: ['color', 'mood', 'design'],
		minLength: 0
	})
	
	$('#btn-add-tag').click(inputTag)
	$('#tags').keypress(function(e){
		if(e.which == 13){
			inputTag()
		}
	})
	
	$('.next').click(onSubmit)
}

// when the user adds a tag (not automatic)
function inputTag(e){
	var text = $('#tags').val()
	
	$('#tags').val('')
	if(tags.indexOf(text) != -1) return
	
	// preprocess tags to remove '#'
	text = text.split('#').join('')
	
	tags.push(text)
	
	var closeBtn = $('<span />', {
		class: 'btn btn-action',
		text: text
	})
	
	var closeIcon = $('<i />', {
		class: 'icon-remove'
	})
	
	closeBtn.append(closeIcon)
	
	closeBtn.click(onCloseTag)
	
	$('#tag-list').append(closeBtn)
}

function onSubmit(){
	window.location = 'index.html?tags=' + tags.join(',')
}

function onCloseTag(e){
	var tagName = $(this).parent().text()
	removeTag(tagName)
}

function removeTag(name){
	$('#tag-list').children().each(function(i, e){ 
		var $e = $(e)
		if($e.text() == name){
			$e.remove()
		}
	})
	
	$.each(tags, function(i, e){
		if(e == name){
			tags.splice(i, 1)
		}
	})
}
