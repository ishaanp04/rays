import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Database Connected');
  });
  const conn = await mongoose.connect(`${process.env.MONGO_URI}/rays`);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
