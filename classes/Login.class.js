var loginUrl = g.settings;

module.exports = class Login {
	constructor(express){
		this.app = express;
		this.settings = loginUrl.Login;
		this.mongo = new g.classes.Mongo();
		this.user = this.mongo.getModel('User');
    this.bcrypt = m.bcrypt;

		this.loginSetup()
	}

	loginSetup() {
    var me = this;

    this.app.post('/login/user', (req, res) => {
    	var data = req.body || {};
    	if(!data.username || !data.password) {
    		res.sendStatus(400);
    		res.end();
    		return;
  		}
    	this.user.findOne({username: data.username}, (err, result) => {
    		if(!result){
    			res.json(false);
          return;
    		}
        me.bcrypt.compare(data.password, result.password, (err, res_boolean) => {
          if(err){
            console.log(err); 
            res.sendStatus(400); 
            return;
          }
          if(res_boolean){
        		req.session.isLoggedIn = result._id; 
        		req.session.xUsername = result.username;
            req.session.title = result.title;
        		req.sessionID = result._id.toString();
        		console.log("UserId:", result._id, "is logged in.");
            console.log("current session id:", req.sessionID);
        		console.log("current session title:", req.session.title);
        		res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername, 'X-title', req.session.title);
        		res.json(true);
        		return;
          }
        }) 
    	})
    });

    this.app.get('/login/getsession', (req, res) => {
      res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername, 'X-title', req.session.title);
      console.log(!!req.session.isLoggedIn);
      res.json(!!req.session.isLoggedIn);
    }) 

    this.app.get('/login/gettitle', (req, res) => {
    	res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername, 'X-title', req.session.title);
    	res.json(req.session.title);
    })

    this.app.get('/login/deletesession', (req, res) => {
      console.log("Destroyed sessionID: "+req.sessionID);
      delete req.session.isLoggedIn;
    	delete req.session.title;
    	res.json(true);
    });
  }
}