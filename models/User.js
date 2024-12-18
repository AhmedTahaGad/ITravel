const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    places: { type: Array }
});

const User = mongoose.model('User', userSchema, "myCollection");

module.exports = User;