
define(['express','http','fs','module', 'path', 'web'], function (express, http, fs, module, path, Web) {
	var app = express();

	var LAPSE = 600000;

	var API_KEY = "AIzaSyDiNhFxatn5SN25Mb1CqAN0lhkHw9do5l4"

	var videosArray = [
	{name: 'ZeedProtection', id: 'H4cVEQAw7QE'},
	{name: 'ChessLive', id: '6SRwJVXxMzU'},
	{name: 'EasyPark', id: 'DHtxQWAG_iI'},
	{name: 'ManagEat', id: 'tHmSK8-ykjY' },
	{name: 'Dafply', id: '5HFbLfVLNxg'},
	{name: 'Newin', id: 'tQb0s154ZYQ'},
	{name: 'Exivit', id: 'pKqvoIfLRPo'},
	{name: 'Phobius', id: 'k8N0dwa4kS4'},
	{name: 'Noctambuls', id: 'ArJXK8ZySxo'},
	{name: 'Hemav', id: 'J5GlNX4E3Kc'},
	{name: 'Onfan', id: 'i9upp1EKJuk'},
	{name: 'GigWorking', id: 'TzTphy93KHQ'},
	{name: 'CompanyHorse', id: '_iaP-f65iuE'},	
	{name: 'Onfan', id: 'i9upp1EKJuk'},
	{name: 'Qmunify', id: 'oDA-SkumLfQ'}	
	];

	app.configure(function(){
		app.use(express.bodyParser());
		app.use(express.static('/data'));
	});

	console.log('uri is: ' +  path.dirname(module.uri));

	app.get('/', function(req, res) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write("Datos recopilados ordenados de mayor a manor vistas: ");
		res.write('<ol>');
		videosArray.forEach(function (element) {
			res.write('<li>' + element.name + '<a href=graphs/' + element.name + '.txt> Grafica </a> || <a href=' + element.name + '.txt> Datos </a> </li>');
		});
		res.write('</ol>');
		res.end();
	});

var webi = new Web();

app.get('/graphs/:file', webi.draw);

setInterval(function() {
	videosArray.forEach(function (element) {		
		https.get("https://www.googleapis.com/youtube/v3/videos?id="+ element.id +"&key="+ API_KEY +"&part=statistics", 
			function(res) {
				res.on("data", function(chunk) {
					console.log("VideoName: " + element.name);
					var item = JSON.parse(chunk);
					var viewCount =  item.items[0].statistics.viewCount;
					console.log("ViewCount: " + viewCount);
					var likeCount = item.items[0].statistics.likeCount;
					console.log("likeCount: " + likeCount);
					var timeStamp = new Date().getTime()
					console.log("TimeStamp: " + timeStamp);

					fs.appendFile('data/' + element.name + '.txt', timeStamp + ':' + viewCount + ':' + likeCount + '//', function (err) {
						if (err) throw err;
						console.log('The "data to append" was appended to file!');
					});
				});
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
			});
		});	
}, LAPSE);

return app;
});


