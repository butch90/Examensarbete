var connection;

module.exports = class Mongo {
	constructor(){
		if (connection) { return; }

		this.mongo = m.mongoose;

		this.connect();

		this.loadModels();
	}

	connect(){
		this.mongo.connect("mongodb://127.0.0.1:27017/BRP", function(err, db) {
		  if(!err) {
		    console.log("MongoDB connected");
		  } 
		  else {
		  	console.log("error", err.stack);
		  }
		});

		connection = this.mongo.connection;
	}
	getModel(modelName) {
		return m.mongoose.model(modelName);
	}
	loadModels() {
		var models = m.fs.readdirSync(m.path.join(g.settings.appRoot,'schemas/'));
		var loaded = [];
		models.forEach(function (file) {
			require(m.path.join(g.settings.modelDir, file));
			loaded.push(file);
		});
		console.log('Loaded modules: ' + loaded);
	}
}