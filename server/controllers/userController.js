import userModel from '../models/userModel.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const missingFields = [];
      if (!name) missingFields.push('Name');
      if (!email) missingFields.push('Email');
      if (!password) missingFields.push('Password');

      let message = '';

      if (missingFields.length === 1) {
        message = `${missingFields[0]} missing`;
      } else if (missingFields.length === 2) {
        message = `${missingFields[0]} and ${missingFields[1]} missing`;
      } else {
        const last = missingFields.pop();
        message = `${missingFields.join(', ')}, and ${last} missing`;
      }

      return res.json({
        success: false,
        message,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
        name,
        email,
        password: hashedPassword,
      };

      const newUser = new userModel(userData);
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

      res.json({ success: true, token, user: { name: savedUser.name } });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default { registerUser, loginUser };
