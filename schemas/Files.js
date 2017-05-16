var Schema = m.mongoose.Schema({
	fileName: {type: String, required: true}
});

module.exports = m.mongoose.model("Files", Schema);