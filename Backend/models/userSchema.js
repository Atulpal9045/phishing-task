const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.index({ id: 1 });
userSchema.index({ email: 1 });
const User = mongoose.model("Users", userSchema);

module.exports = User;
