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
      className="flex flex-col justify-center items-center text-center my-6a"
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
        className="text-4xl text-[68.02px] max-w-[300px] sm:text-6xl sm:max-w-[580px] line mx-auto mt-10 text-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0, duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
      >
        Turn text to <span className="text-purple-600">image</span>, in seconds.
      </motion.h1>

      <motion.p
        className="text-center text-neutral-500 font-light text-[22.8px] max-w-2xl mx-auto mt-5"
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
      >
        A not so ground breaking app that calls an api that returns images from
        text prompts
      </motion.p>

      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-8 py-2.5 flex items-center gap-4 rounded-full"
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

      <div className="px-24 relative">
        <div className="fade-mask">
          <motion.div
            ref={scrollRef}
            style={{ scaleX: scrollXProgress }}
            className="flex gap-3 mt-16 overflow-x-scroll hide-scroll-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0, 0.4, 0.1, 1.01],
            }}
          >
            {Array(20)
              .fill('')
              .map((item, index) => {
                return (
                  <img
                    className="rounded-lg hover:scale-110 transition-all duration-100 ease-in-out cursor-pointer max-sm:w-10"
                    src={
                      (index & 1) == 0
                        ? assets.sample_img_1
                        : assets.sample_img_2
                    }
                    alt=""
                    key={index}
                    width={200}
                  />
                );
              })}
          </motion.div>
        </div>
      </div>
      <motion.p
        className="mt-2 text-neutral-600"
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
