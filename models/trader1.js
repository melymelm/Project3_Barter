var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TraderSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: "First Name is Required"
	},
	lastName: {
		type: String,
		trim: true,
		required: "Last Name is Required"
	},
	email: {
		type: String,
		unique: true,
		match: [/.+\@.+\..+/, "Please enter valid e-mail address."]
	},
	password: {
		type: String,
		trim: true,
		required: "Password is Required",
		validate: [
		function(input) {
			return input.length >= 6;
		},
		"Password should be 6 characters or longer."
		] 
},
lastUpdated: { type: Date },
fullName: String
});

// Custom Methods
// get the full name
TraderSchema.methods.getFullName = function() {
	this.fullName = this.firstName + " " + this.lastName;
	return this.fullName;
}

// save the current date and return it.
TraderSchema.methods.lastUpdatedDate = function() {
	this.lastUpdated = Date.now();
	return this.lastUpdated;
}

var Traders = mongoose.model("Traders", TraderSchema);

module.exports = Traders;