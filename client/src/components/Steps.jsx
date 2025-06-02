import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'motion/react';
import { stepsData } from '../assets/assets';

const Steps = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-32"
      initial={{ opacity: 0.1, y: 100 }}
      // animate={{ opacity: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0, 0.2, 0.1, 1] }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How It Works</h1>
      <p className="text-lg text-gray-600 mb-8 ">Transform Words Into Images</p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 px-8 bg-white/20 border border-neutral-200 shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-100 rounded-2xl"
          >
            <div className="px-[16px] py-[14px] rounded-full text-xl bg-purple-50 drop-shadow-md">
              <FontAwesomeIcon
                className="aspect-square"
                icon={step.icon}
                fixedWidth
              />
            </div>
            <div>
              <h2 className="text-xl font-medium">{step.title}</h2>
              <p className="text-[13px] text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
