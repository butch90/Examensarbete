var Schema = m.mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	firstname: {type: String, required: false},
	lastname: {type: String, required: false},
	email: {type: String, required: true, unique: true},
	title: {type: String, required: false}
});

module.exports = m.mongoose.model("User", Schema);