module.exports = class Fs {

	constructor(express) {
		this.app = express;
		this.appRoot = g.settings.appRoot;
		this.fileRoot = g.settings.fileRoot;
		this.settings = g.settings.Server;
		this.fs = m.fs;
		this.multer = m.multer;
		this.upload = m.upload;
		this.router();
		this.dataBase = new g.classes.Mongo();
		this.files = this.dataBase.getModel('Files');
		this.videos = this.dataBase.getModel('Videos');
	}
	router() {
		var me = this;

		//Video section
		this.app.get('/fs/getvideourls', (req, res) => {
			me.videos.find((err, result) => {
				if(err) {
					res.json(err);
				}
				//console.log(result);
				res.json(result);
			})
		});

		this.app.post('/fs/addvideourl', (req, res) => {
			//console.log(req.body);
			me.videos.create(req.body, (err, data) => {
				if(err) {
					res.json(err);
				}
				res.json(data);
			})
		});

		//Image section
		this.app.post('/fs/uploadFile', me.upload.any(), (req, res) =>{
			res.json({status: 'working'});
		});

		this.app.post('/fs/uploadName', (req, res) =>{
			var length = req.body.fileName.length-1;
			req.body.fileName = req.body.fileName.slice(1, length)
			me.files.create(req.body, (err, data) => {
				if(err) {
					res.json(err);
				}
				res.json(data);
			})
		});

		this.app.get('/fs/showFiles', (req, res) => {
			var fileArray = [];
			var folder = me.appRoot + '/uploads';
			me.fs.readdir(folder, (err,files) => {
				if(err){ 
					res.send(err);
				} else {
					files.forEach(file => {
						var length = file.length-4;
						var finalFile = file.slice(0, length);
						var fileUrl = '../../uploads/'+ finalFile;
						fileArray.push(fileUrl);
					});
				}
			//console.log(fileArray);
			var finalFiles = JSON.stringify(fileArray);
			res.json(finalFiles);
			});
		});

		this.app.get('/fs/getfilename', (req, res) => {
			var query = req.params.id ? 'findById' : 'find';
			var data = req.params.id ? req.params.id : {};
			me.files[query](data, (err, result) => {
				if(err) {
					res.json(err);
				}
				res.json(result);
			});
		});

		this.app.delete('/fs/removefilename/:id?', (req, res) => {
			me.files.findByIdAndRemove(req.params.id, (err,data) => {
				if(err) {
					console.log(err);
					res.json(err);
				}
				res.json('Removed');
			})
		});

		this.app.post('/fs/removeFromDir', (req, res) => {
			var path = req.body.fileName;
			var finalPath = me.fileRoot + '/uploads/' + path;
			me.fs.unlink(finalPath, (err , cb) => {
				if(err) {
					console.log("err");
					res.json("error");
				}
				res.json("deleted");
			})
		});

		this.app.post('/fs/showinfo', (req, res) => {
			var path = req.body.fileName;
			var finalPath = me.fileRoot + '/uploads/' + path;
			me.fs.stat(finalPath, (err, result) => {
				if(err) {
					console.log(err);
					res.json("error");
				}
				res.json(result);
			})
		});

		this.app.get('/fs/getallimages', (req, res) => {
			me.files.find(function (err, result) {
				res.json(result);
			});
		});

		this.app.delete('/fs/deleteimage/:id?', (req, res) => {
			me.files.findByIdAndRemove(req.params.id, (err, result) => {
				if(err) {
					console.log(err);
					res.json(err);
				}
				res.json('Removed');
			})
		})
		
		this.app.delete('/fs/deletevideo/:id?', (req, res) => {
			me.videos.findByIdAndRemove(req.params.id, (err, result) => {
				if(err) {
					console.log(err);
					res.json(err);
				}
				res.json('Removed');
			})
		})
	}
}