var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require("bcryptjs");

var SALT_WORK_FACTOR = 10;

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
	businessName: {
		type: String,
		trim: true,
		required: "Business Service Required"
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
	zipCode: {
		type: String,
		trim: true,
		required: "Zip Code is Required"
	},
	phoneNumber: {
		type: String,
		trim: true,
		required: "Phone Number is Required"
	},
	category: {
		type: String,
		trim: true,
		required: "You must have something to offer to join."
	},
lastUpdated: { type: Date },
fullName: String
});

// Custom Methods
TraderSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

TraderSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

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