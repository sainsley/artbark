var userEmail

function login(){
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
		userEmail = $.getUrlVar('userEmail');
		$("#linkUserEmail")[0].innerHTML = userEmail;
		//trialsPerUser = (parseInt($.getUrlVar('trialsPerUser')))	
	}
	
	// add ?userEmail= to links that need login info
	$('.need-login').each(function(i, e){ $(e).attr('href', $(e).attr('href') + '?userEmail=' + userEmail) })
}