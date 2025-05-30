import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="pb-16 text-center"
      initial={{ opacity: 0.1, y: 100 }}
      // animate={{ opacity: 1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0, 0.2, 0.1, 1] }}
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-10">
        See the magic. Try Now
      </h1>
      <button
        onClick={onClickHandler}
        className="inline-flex items-center gap-4 rounded-full sm:text-lg text-white bg-black w-auto mt- px-8 py-2.5 m-auto hover:scale-105 transition-all duration-200"
      >
        <div>Generate Images</div>
        <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" />
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
