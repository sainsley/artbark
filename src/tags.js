$(init)

var tags = []
var allUserData
function init(){
	login()
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
	
	getUserData(addExistingTags)
	
	$('.next').click(onSubmit)
}

// when the user adds a tag (not automatic)
function inputTag(e){
	var text = $('#tags').val()
	
	$('#tags').val('')
	
	// preprocess tags to remove '#'
	text = text.split('#').join('')
	
	// multitag support
	text = text.split(/\s+/)
	
	
	var newTags = tags.concat(text)
	var oldTags = tags
	
	tags = []
	for(var i = 0; i < newTags.length; i++){
		if(tags.indexOf(newTags[i]) == -1) tags.push(newTags[i])
	}
	
	var tagDiff = tags.filter(function(e){ return oldTags.indexOf(e) == -1 })
	$.each(tagDiff, function(i, e){ addTagElement(e),console.log('adding') })
}

function addExistingTags(userData){
	tags = userData[userEmail].tags
	allUserData = userData
	console.log('adding user data', tags)
	$.each(tags, function(i, e){ addTagElement(e) })
}

function addTagElement(text){
	var closeBtn = $('<div />', {
		class: 'btn btn-action tag-btn',
	})
	
	var closeIcon = $('<i />', {
		class: 'icon-remove'
	})
	
	var closeText = $('<span />', {
		class: 'tag-text',
		text: text
	})
	
	closeBtn.append(closeText)
	closeBtn.append(closeIcon)
	closeBtn.click(onCloseTag)
	
	$('#tag-list').append(closeBtn)
}

function onSubmit(){
	console.log('posting tags')
	console.log(allUserData)
	var artTitle  = allUserData[userEmail].title
	console.log(artTitle)
	$.ajax({
		type: 'POST',
		dataType: 'text',
		url: '/tags',
		data: JSON.stringify({
			email: userEmail,
			tags: tags
		}),

		//
		
		//success: function(){ window.location = 'index.html?userEmail=' + userEmail + '&tags=' + tags.join(',') }
		success: function(){ window.location = 'share.html?artistEmail=' + userEmail + "&artTitle=" + artTitle}
	})
	
	return false
}

function onCloseTag(e){
	console.log($(this).children())
	var tagName = $(this).children('.tag-text').text()
	removeTag(tagName)
}

function removeTag(name){
	$('#tag-list').children().each(function(i, e){ 
		var $e = $(e)
		if($e.children('.tag-text').text() == name){
			$e.remove()
		}
	})
	
	$.each(tags, function(i, e){
		if(e == name){
			tags.splice(i, 1)
		}
	})
}
