import React from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets/assets';

const Description = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-24 px-6a md:px-28a"
      initial={{ opacity: 0.1, y: 100 }}
      // animate={{ opacity: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0, 0.2, 0.1, 1] }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row max-w-[1030p] px-68 items-center">
        <img
          className="w-80 xl:w-96 rounded-lg"
          src={assets.sample_img_1}
          alt=""
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            AI Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
            blanditiis quod quas, cumque deserunt aut alias mollitia, odit,
            velit nam quisquam sint repellendus eaque esse? Pariatur aliquid
            quia itaque necessitatibus.
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
            blanditiis quod quas, cumque deserunt aut alias mollitia, odit,
            velit nam quisquam sint repellendus eaque esse? Pariatur aliquid
            quia itaque necessitatibus.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
