var
	http = require('http'),
	url = require('url'),
	util = require('util'),
	fs = require('fs'),
	static = (new (require('node-static').Server)),
	formidable = require('formidable')

var 
	UPLOAD_DIR = '/uploads'

var API = {
	'/upload': onUpload,
	'/comment': onComment,
	'/data': onUserDataRequest,
	'/tags': onSubmitTags,
	'/groups': onSubmitUserGroups
}

// basically all 'permanent' data except file uploads is stored here
var users = JSON.parse(fs.readFileSync('userData.json', { encoding: 'utf8' }))

http.createServer(onRequest).listen(1234)

/*
	The main entry point for all requests.  
*/
function onRequest(req, res){
	var path = url.parse(req.url).pathname
	
	console.log('got request for ', path)
	
	if(path in API){
		API[path](req, res)
	} else {
		static.serve(req, res, function(err, result){ onStaticRequest(res, err, result) })
	}
	
	fs.writeFile('userData.json', JSON.stringify(users), function(err){ if(err) console.log(err) })
}

/*
	Requests for static files are mostly handled by the node-static module, but we do want 
	something more than a blank response when there's something like a 404.
*/
function onStaticRequest(res, err, result){
	if(!err) return
	
	res.writeHead(err.status, err.headers)
	res.end('An error occurred.  Please take a different approach next time. Error details: \n' + JSON.stringify(err))
}

/*
	The client portions of the application have access to ALL user data. Who needs security in a prototype?
	This is the request handler for when the client/browser requests all that data.
*/
function onUserDataRequest(req, res){
	res.writeHead(200, { 'content-type': 'application/json' })
	res.end(JSON.stringify(users))
}

function onComment(req, res){
	
}

/*
	Stores the tags picked by the uploader.
*/
function onSubmitTags(req, res){
	parseJSON_POST(req, function(json){
		console.log('got tags in POST', json)
		var user = account(json.email)
		user.tags = json.tags
		
		OK(res)
	})
}

/*
	Stores the selections made on the reviewer group privacy settings page.
*/
function onSubmitUserGroups(req, res){
	parseJSON_POST(req, function(json){
		console.log('got reviewer groups', json)
		var user = account(json.email)
		user.groups = json.groups
		
		OK(res)
	})
}

function parseJSON_POST(req, callback){
	var body = ''
	req.on('data', function(data){ body += data })
	req.on('end', function(){ callback(JSON.parse(body)) })
}

/*
	Handles the form submission from the artist's upload page.  File is moved into the /uploads/ folder 
	and given a name based on `userEmail`.
*/
function onUpload(req, res){
	console.log('got upload request')
	
	var form = new formidable.IncomingForm
	
	form.parse(req, function(err, fields, files){
		// only care about one image file
		
		var file = files.imageFile
		var email = fields.userEmail
		var user = account(email)
		
		if(!file){
			res.writeHead(400, { 'content-type': 'text/plain' })
			res.end('Bad request.')
			return
		}
		
		var filename = email + '.' + file.name.split('.').reverse()[0]
		fs.rename(file.path, process.cwd() + UPLOAD_DIR + '/' + filename)
		
		user.artFile = filename
		
		res.writeHead(200, { 'content-type': 'text/plain' })
		res.end(JSON.stringify({ // this object format is expected by the file upload plugin.  probably won't use it.
			files: [{ 
				name: 'fooupload.jpg', 
				size: 9000, 
				url: 'fooupload.jpg', 
				thumbnail_url: 'fooupload.jpg', 
				delete_url: '/delete',
				delete_type: 'DELETE'
			}]
		}))
	})
}

// utility function that ends a request we don't care much about with a generic 200, 'ok' message.
function OK(res){
	res.writeHead(200, { 'content-type': 'text/plain' })
	res.end('OK')
}

/*
	Finds or creates a user given their email.  Email is basically an account name or equivalent in function.
*/
function account(email){
	if(email in users) return users[email]
	
	var _user = {
		email: email,
		artFile: '',
		comments: [],
		tags: [],
		groups: { public: [], private: [] }
	}
	
	users[email] = _user
	return _user
}