module.exports = class Order {

	constructor(express) {
		this.app = express;
		this.nodemailer = m.nodemailer;
		this.dataBase  = new g.classes.Mongo();
		this.user = this.dataBase.getModel('User');
		this.reg = this.dataBase.getModel('Registration');

		var me = this;
		this.router();
	}
	router() {
		var me = this;
		this.app.post('/user/newregistration', (req, res) =>{
			console.log(req.body);
			me.reg.create(req.body, (err, data) => {
				if(err) {
					res.json(err);
				}
				res.json(data);
			})
		});

		this.app.post('/user/createnewuser', (req, res) =>{
			var email = req.body.email;
				var transporter = me.nodemailer.createTransport({
			    service: 'gmail',
			    auth: {
        			user: 'burningrubberpjaskebywebpage@gmail.com',
       				pass: 'brpadmin90'
    			}
				});

				var mailOptions = {
					from: '"BRP Admin" <burningrubberpjaskebywebpage@gmail.com>',
					to: email,
					subject: 'Brpmc.se - Konto registrerat',
					html: 'Tack för din registrering, ditt konto är nu godkänt och du kan logga in. Välkommen till brpmc.se',
				}

				transporter.sendMail(mailOptions, (error, info) => {
					if(error){
						console.log(error);
					}
					console.log(info.messageId, info.response);

					me.user.create(req.body, (err, data) => {
						if(err) {
							res.json(false);
						}
						res.json(data);
					})
				})
		});

		this.app.get('/user/getregistrations', (req, res) => {
			var query = req.params.id ? 'findById' : 'find';
			var data = req.params.id ? req.params.id : {};
			me.reg[query](data, (err, result) => {
				if(err) {
					res.json(false);
				}
				res.json(result);
			});
		});

		this.app.get('/user/getusers', (req, res) => {
			var query = req.params.id ? 'findById' : 'find';
			var data = req.params.id ? req.params.id : {};
			me.user[query](data, (err, result) => {
				if(err) {
					res.json(false);
				}
				res.json(result);
			});
		});

		this.app.get('/user/getmembers', (req, res) => {
			var query = req.params.id ? 'findById' : 'find';
			var data = req.params.id ? req.params.id : {};
			me.user[query](data, (err, result) => {
				if(err) {
					res.json(false);
				}
				res.json(result);
			});
		});

		this.app.put('/user/updateuser/:id?', (req, res) => {
			me.user.findByIdAndUpdate(req.params.id, req.body, (err,data) => {
				if(err) {
					res.json(false);
				}
				res.json(true);
			})
		});

		this.app.delete('/user/deniedregistration/:id?', (req, res) => {
			me.reg.findByIdAndRemove(req.params.id, (err,data) => {
				if(err) {
					res.json(false);
				}
				res.json(true);
			})
		});

		this.app.delete('/user/deniedaccount/:id?', (req, res) => {
			me.user.findByIdAndRemove(req.params.id, (err,data) => {
				if(err) {
					res.json(false);
				}
				res.json(true);
			})
		});
	}
}