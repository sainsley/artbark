$(init)

var tags = ['happy', 'sad']

function init(){
	$('#tags').typeahead({
		source: ['aaa', 'bbb', 'ccc']
	})
}