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
  promptHistory: {
    type: [
      {
        prompt: String,
        imageUrl: String,
        generatedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
