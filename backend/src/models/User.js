const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true,
  },
  userName: {
    type: String,
    default: '',
    trim: true,
  },
  name: {
    type: String,
    default: '',
    trim: true,
  },
  location: {
    type: String,
    default: '',
    trim: true,
  },
  githubURL: {
    type: String,
    default: '',
    trim: true,
  },
  userType: {
    type: String,
    default: 'User',
  },
  githubAccessToken: {
    type: String,
    default: ''
  },
  createdOn: {
    type: Date,
    default: '',
  },
  avatar: {
    type: String,
    default: process.env.DEFAULT_AVATAR_PIC
  },
});

mongoose.model('User', userSchema);