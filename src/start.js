var cancelled

$(init)

function init(){
	console.log('start page')

			$.extend({
				getUrlVars : function() {
					var vars = [], hash;
					var hashes = window.location.href.slice(
							window.location.href.indexOf('?') + 1).split('&');
					for ( var i = 0; i < hashes.length; i++) {
						hash = hashes[i].split('=');
						vars.push(hash[0]);
						vars[hash[0]] = hash[1];
					}
					return vars;
				},
				getUrlVar : function(name) {
					return $.getUrlVars()[name];
				}
			});

				if($.getUrlVar('userEmail')) 
				{
					var userEmail = $.getUrlVar('userEmail');
					$("#linkUserEmail")[0].innerHTML = userEmail;
					//trialsPerUser = (parseInt($.getUrlVar('trialsPerUser')))	
				}
	
	$('#hidden-upload').click($('#art-file').click)
	$('#cancel-btn').click(onCancel)
	
	$('#art-file').fileupload({
		dropZone: $(document),
		start: onUploadStart,
		done: function(e, data){ throw 'unhandled successful upload' },
		fail: function(e, data){ if(!cancelled) window.location = 'settings.html' }
	})
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