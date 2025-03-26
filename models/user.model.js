import mongoose from 'mongoose'
// an object that allows you to define how a specific model is going to look like (down)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name is required'],
    // if we have empty spaces in there (down)
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    // only one user having that specific email (down)
    unique: true,
    trim: true,
    lowercase: true,
    // regular expression to check emails (down)
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minLength: 6

  }

},
  // always knowing when that user has been created or modified (down)
  { timestamps: true });
// new model off of that schema (down [models tippically start with a capital letter])
const User = mongoose.model('User', userSchema);

// creating instances of that model such as diffrent users 
export default User;

