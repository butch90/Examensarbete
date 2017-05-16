var loginUrl = g.settings;

module.exports = class Login {
	constructor(express){
		this.app = express;
		this.settings = loginUrl.Login;
		this.mongo = new g.classes.Mongo();
		this.model = this.mongo.getModel('User');

		this.loginSetup()
	}

	loginSetup() {
    var me = this;

    this.app.post('/login/user', (req, res) => {
    	console.log("POST LOGGEDIN");
    	var data = req.body || {};

    	if(!data.username || !data.password) {
    		res.sendStatus(400);
    		res.end();
    		return;
  		}
    	this.model.findOne(data, (err, result) => {
    		if(!result){
    			res.json(false);
          return;
    		} 
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
    	})
    });

    this.app.get('/login/getsession', (req, res) => {
      console.log("GET LOGGEDIN");
      res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername, 'X-title', req.session.title);
      console.log(!!req.session.isLoggedIn);
      res.json(!!req.session.isLoggedIn);
    }) 

    this.app.get('/login/gettitle', (req, res) => {
    	console.log("GET TITLE");
    	res.header('X-Client-id', req.sessionID).header('X-username', req.session.xUsername, 'X-title', req.session.title);
    	res.json(req.session.title);
    })

    this.app.get('/login/deletesession', (req, res) => {
    	console.log("DELETE LOGGEDIN");
      delete req.session.isLoggedIn;
    	delete req.session.title;
      //console.log(req.session.isLoggedIn);
      //console.log(req.sessionID);
      //console.log(req.session.title);
    	res.json(true);
    });
  }
}