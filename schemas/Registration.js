var Schema = m.mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	title: {type: String, required: false}
});

module.exports = m.mongoose.model("Registration", Schema);