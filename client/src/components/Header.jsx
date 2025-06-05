import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const { scrollXProgress } = useScroll();
  const scrollRef = useRef(null);
  const onClickHandler = () => {
    if (user) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;

    const handleWheel = (e) => {
      // Prevent vertical scrolling
      e.preventDefault();
      // Scroll horizontally instead
      // container.scrollLeft += e.deltaY;
      container.scrollTo({
        left: container.scrollLeft + e.deltaY + (e.deltaY > 0 ? 500 : -500),
        behavior: 'smooth',
      });
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center max-sm:mt-8"
      initial={{ opacity: 0.2, y: 10 }}
      transition={{ duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -50 }}
        // transition={{ duration: 1, ease: [0, 0.4, 0.1, 1.01] }}
        animate={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0, 0.4, 0.1, 1.01] }}
      >
        <p>Lorem ipsum dolor sit amet.</p>
        <div>
          <FontAwesomeIcon
            icon="fa-solid fa-star"
            className="text-yellow-600"
          />
        </div>
      </motion.div> */}

      <motion.h1
        className="lg:text-[56px] lg:leading-14 lg:max-w-[550px] md:max-w-[500px] md:text-5xl md:leading-14 sm:text-4xl sm:max-w-[350px] max-sm:text-4xl max-sm:max-w-[350px] line mx-auto mt-6 text-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0, duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
      >
        Turn text to <span className="text-purple-600">image</span>, in seconds.
      </motion.h1>

      <motion.p
        className="text-center text-neutral-700 font-light lg:text-[21.33px] lg:leading-8 lg:max-w-2xl md:text-[20px] md:leading-7 md:max-w-xl sm:text-[14px] sm:max-w-md max-sm:max-w-sm max-sm:text-[14px]  max-md:font-normal mx-auto md:mt-5 sm:mt-3 max-sm:mt-2"
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
      >
        A not so ground breaking app that calls an api that returns images from
        text prompts
      </motion.p>

      <motion.button
        onClick={onClickHandler}
        className="text-white bg-purple-950 w-auto md:text-lg md:mt-8 md:px-8 md:py-2.5 sm:text-sm sm:px-4 sm:py-2 max-sm:text-sm max-md:px-3 max-md:py-2 sm:mt-4 max-sm:mt-3 flex items-center gap-4 rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        initial={{ opacity: 0, x: 200, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        // transition={{ delay: 0.2, duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
        transition={{
          default: { duration: 0.1 },
          opacity: { delay: 0.3, duration: 0.3 },
          x: { delay: 0.3 },
          // ease: [0, 0.4, 0.1, 1.01],
        }}
      >
        <div>Generate Images</div>
        <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" />
      </motion.button>

      <div className="px-16 sm:px-8 md:px-12 lg:px-24 relative bg-blue-100a">
        <div className="fade-mask w-full overflow-hidden bg-red-200a">
          <div
            ref={scrollRef}
            style={{ scaleX: scrollXProgress }}
            className="flex md:gap-3 sm:gap-2 max-sm:gap-1 bg-purple-300a w-full py-3 lg:mt-8 md:mt-6 sm:mt-4 max-sm:mt-3 overflow-x-auto hide-scroll-bar"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{
            //   delay: 0.2,
            //   duration: 0.6,
            //   ease: [0, 0.4, 0.1, 1.01],
            // }}
          >
            {Array(20)
              .fill('')
              .map((item, index) => {
                return (
                  <img
                    className="rounded-lg hover:scale-110 max-sm:hover:scale-105 transition-all duration-100 ease-in-out cursor-pointer max-sm:w-32 lg:w-50 md:w-40 sm:w-28"
                    src={
                      (index & 1) == 0
                        ? assets.sample_img_1
                        : assets.sample_img_2
                    }
                    alt=""
                    key={index}
                    // width={200}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <motion.p
        className="mt-2 text-neutral-600 max-md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0, 0.4, 0.1, 1.01] }}
      >
        Images generated using rays
      </motion.p>
    </motion.div>
  );
};

export default Header;
