import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A username is required'],
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
