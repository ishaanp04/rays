import React from 'react';
import { motion } from 'motion/react';
import { testimonialsData } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Testimonials = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center lg:mt-18 sm:mt-10 max-sm:mt-14 py-12"
      initial={{ opacity: 0.1, y: 100 }}
      // animate={{ opacity: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0, 0.2, 0.1, 1] }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>
      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div
            className="bg-white/20 p-12 rounded-lg shadow-md  w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
            key={index}
          >
            <div className="flex flex-col items-center">
              <img
                className="rounded-full w-16"
                src={testimonial.image}
                alt=""
              />
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>
              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((star, index) => (
                    <div key={index}>
                      <FontAwesomeIcon
                        className="text-yellow-500"
                        icon="fa-solid fa-star"
                      />
                    </div>
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
