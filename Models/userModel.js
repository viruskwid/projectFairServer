const mongooose = require("mongoose");
const userSchema = new mongooose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
})

const users = mongooose.model('users',userSchema)
module.exports = users
