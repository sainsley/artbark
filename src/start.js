var cancelled

$(init)

function init(){
	console.log('start page')
	
	login()
	
	$('#hidden-upload').click($('#art-file').click)
	$('#cancel-btn').click(onCancel)
	
	$('#art-file').fileupload({
		dropZone: $(document),
		start: onUploadStart,
		done: function(e, data){ if(!cancelled) window.location = 'settings.html?userEmail=' + userEmail },
		fail: function(e, data){ throw 'unhandled failed upload' },
		formData: [{ name: 'userEmail', value: userEmail }, { name: 'title', value: $('#title').val() }]
	})
	
	$('#title').keyup(onTitleChange)
	$('#title').change(onTitleChange)
}

function onTitleChange(e){
		$('#art-file').fileupload('option', 'formData', [{ 
			name: 'userEmail', 
			value: userEmail 
		}, { 
			name: 'title', 
			value: $('#title').val() 
		}])
}

function onUploadStart(e){
	addProgressBar()
	$('#cancel-btn').removeClass('disabled')
	cancelled = false
}

function onCancel(e){
	removeProgressBar()
	$('#cancel-btn').addClass('disabled')
	cancelled = true
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