$(init)

function init(){
	console.log('start page')
	
	$('#hidden-upload').click(function(e){ $('#art-file').click() })
	
	$('#art-file').fileupload({
		dropZone: $(document),
		done: function(e, data){ throw 'unhandled successful upload' },
		fail: function(e, data){ window.location = 'settings.html' }
	})
}