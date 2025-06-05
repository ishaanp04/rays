import React from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets/assets';

const Description = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center lg:mt-20 sm:mt-16 max-sm:mt-14"
      initial={{ opacity: 0.1, y: 100 }}
      // animate={{ opacity: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0, 0.2, 0.1, 1] }}
    >
      <h1 className="lg:text-4xl sm:text-3xl max-sm:text-2xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>

      <div className="flex gap-6 max-lg:flex-col md:gap-14 xl:flex-row xl:px-56 md:px-48 max-md:px-24 items-center">
        <img
          className="w-80 2xl:w-96 rounded-lg"
          src={assets.sample_img_1}
          alt=""
        />
        <div>
          <h2 className="xl:text-3xl lg:text-2xl max-sm:text-xl text-[28px] font-medium max-w-lg xl:mb-4 lg:mb-3 max-lg:mb-2 max-lg:text-center xl:text-left">
            AI Text to Image Generator
          </h2>
          <p className="text-gray-600 xl:text-[16px] lg:text-sm max-sm:text-sm xl:mb-4 lg:mb-3 max-lg:mb-2 max-lg:text-center xl:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
            blanditiis quod quas, cumque deserunt aut alias mollitia, odit,
            velit nam quisquam sint repellendus eaque esse? Pariatur aliquid
            quia itaque necessitatibus.
          </p>
          <p className="text-gray-600 xl:text-[16px] lg:text-sm max-sm:text-sm max-lg:text-center xl:text-left">
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
