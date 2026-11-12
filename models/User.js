// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     name:String,
//     email:String
// })

// module.exports = mongoose.model('User', userSchema)

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['admin','user'],
    default: 'user'
  }
});

// Hash password before saving
userSchema.pre('save', async function(){

  // if the password has been the same or not updated
  if(!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)

})

// Method compare password
userSchema.methods.comparePassword = function(inputPassword){
  return bcrypt.compare(inputPassword, this.password)
} 


const User = mongoose.model('User', userSchema);

export default User;
