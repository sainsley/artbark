$(init)

function init(){
	console.log('start page')
	
	$('#hidden-upload').click(function(e){ $('#art-file').click() })
	
	$('#art-file').fileupload({
		dropZone: $(document),
		start: addProgressBar,
		done: function(e, data){ throw 'unhandled successful upload' },
		fail: function(e, data){ window.location = 'settings.html' }
	})
}

function addProgressBar(){
	var progressBar = $('<div />', {
		class: 'progress progress-striped active'
	})
	
	var bar = $('<div />', {
		class: 'bar',
		css: { width: '100%' }
	})
	
	progressBar.append(bar)
	$('#upload-area').append(progressBar)
}

function removeProgressBar(){
	$('#upload-area').children('.progress').remove()
}