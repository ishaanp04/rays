import FormData from 'form-data';
import userModel from '../models/userModel.js';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

export const generateImage = async (req, res) => {
  try {
    const { userId } = req;
    const { prompt } = req.body;
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({
        success: false,
        message: 'Request failed due to missing parameters',
      });
    }
    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: 'Insufficient Credits',
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');

    const resultImage = `data:image/png;base64,${base64Image}`;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(resultImage);
    const imageUrl = uploadResult.secure_url;

    const newPromptEntry = {
      prompt,
      imageUrl,
    };

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
      $push: {
        promptHistory: {
          $each: [
            {
              prompt,
              imageUrl,
              generatedAt: new Date(),
            },
          ],
          $slice: -10, // Keeps only the most recent 10 entries
        },
      },
    });

    res.json({
      success: true,
      message: 'Image generated',
      creditBalance: user.creditBalance - 1,
      imageUrl,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
