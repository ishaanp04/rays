import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'motion/react';
import { stepsData } from '../assets/assets';

const Steps = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center lg:mt-20 sm:mt-16 max-sm:mt-10"
      initial={{ opacity: 0.1, y: 100 }}
      // animate={{ opacity: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0, 0.2, 0.1, 1] }}
    >
      <h1 className="lg:text-4xl sm:text-3xl max-sm:text-2xl font-semibold lg:mb-2 md:mb-1">
        How It Works
      </h1>
      <p className="lg:text-lg md:text-md sm:text-sm max-sm:text-sm text-gray-600 mb-8 ">
        Transform Words Into Images
      </p>
      <div className="space-y-4 w-full lg:max-w-3xl md:max-w-[650px] sm:max-w-xl max-sm:max-w-md text-sm bg-purple-100a">
        {stepsData.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 lg:p-5 sm:p-4 max-sm:p-3 px-8 bg-white/20 border border-neutral-200 shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-100 rounded-2xl"
          >
            <div className="lg:px-[16px] lg:py-[14px] sm:px-[12px] sm:py-[10px] max-sm:px-[10px] max-sm:py-[8px] rounded-full lg:text-xl md:text-lmd bg-purple-50 drop-shadow-md">
              <FontAwesomeIcon
                className="aspect-square"
                icon={step.icon}
                fixedWidth
              />
            </div>
            <div>
              <h2 className="lg:text-xl sm:text-md max-sm:text-sm font-medium">
                {step.title}
              </h2>
              <p className="lg:text-[13px] md:text-xs max-sm:text-xs text-gray-500">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
