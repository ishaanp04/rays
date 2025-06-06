import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Result = () => {
  // const [image, setImage] = useState(
  //   localStorage.getItem('image') || assets.sample_img_1
  // );
  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [promptHistory, setPromptHistory] = useState([]);
  const { generateImage, backendUrl, token } = useContext(AppContext);
  const { scrollXProgress } = useScroll();
  const scrollRef = useRef(null);

  const loadPromptHistory = async () => {
    try {
      // console.log('Fetching history');
      const { data } = await axios.get(backendUrl + '/api/user/history', {
        headers: { token },
      });
      // console.log('Fetched history', data);

      if (data.success) {
        setPromptHistory(data.data.promptHistory);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      // console.log(input);
      const image = await generateImage(input);

      if (image) {
        setIsImageLoaded(true);
        setImage(image);
        // localStorage.setItem('image', image);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPromptHistory();
  }, [isImageLoaded]);

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
    <>
      <div className="flex max-lg:flex-col-reverse max-lg:items-center xl:justify-between lg:justify-center xl:gap-2 lg:gap-8 max-sm:px-8 border-2a border-yellow-500 px-4 mt-12">
        {promptHistory.length && (
          <motion.div
            id="prompt-history"
            className="border-2a border-red-400 pr-12a xl:w-[35%] lg:w-[40%] max-lg:w-full h-[75vh]"
            initial={{ x: -500, scaleY: 0.7 }}
            animate={{ x: 0, scaleY: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0, 0.4, 0.1, 1.01],
            }}
          >
            <div className="flex justify-center bg-purple-800/20a border-2a h-full">
              <div className="flex flex-col bg-purple-400/50a border-2a p-4 w-[80%] max-w-sm max-[400px]:w-full max-h-[63%] mt-20 shadow-md/20 rounded-md inset-shadow-sm/20 my-autoa">
                <h2 className="text-xl  mb-4 pl-6">History</h2>
                <ul className="space-y-4 max-h-[50vh] overflow-y-scroll hide-scroll-bar p-2">
                  {promptHistory.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        // setInput(item.prompt);
                        setImage(null);
                        setImage(item.imageUrl);
                        // setIsImageLoaded(true);
                      }}
                      className="bg-purple-200/30 hover:scale-102 transition-all duration-100 ease-in-out  cursor-pointer p-4 rounded-lg shado"
                    >
                      <p className="text-sm text-gray-700">{item.prompt}</p>
                      {/* <img
                    src={item.imageUrl}
                    alt={`Generated for: ${item.prompt}`}
                    className="mt-2 w-full max-w-md rounded"
                    /> */}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(item.generatedAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        <div className="relativea border-2a xl:w-[30%] lg:w-[40%] border-purple-500">
          <motion.form
            onSubmit={onSubmitHandler}
            className="flex flex-col min-h-[80vh] border-2a border-amber-500 justify-center items-center"
            id="prompt-form"
            initial={{ opacity: 0.2, y: 10 }}
            transition={{ duration: 0.6, ease: [0, 0.4, 0.1, 1.01] }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {isImageLoaded && (
              <h1 className="text-center text-2xl font-semibold mb-2 max-w-sm min-w-sm overflow-auto scroll-m-4">
                {input}
              </h1>
            )}
            <div className="border-2a border-green-600">
              <div className="relative border-6 border-dashed max-[390px]:max-w-2xs flex justify-center items-center border-purple-900 rounded p-2">
                {image ? (
                  <motion.img
                    className="sm:max-w-sm max-sm:max-w-xs border-2 max-[390px]:w-full rounded"
                    src={image}
                    alt=""
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                ) : (
                  <div className="flex flex-col bg-purple-100 m-2 sm:max-w-sm min-w-sm aspect-square text-center justify-center">
                    Your image will come here
                  </div>
                )}
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
                    loading ? 'w-full transition-all duration-[10s]' : 'w-0'
                  } `}
                ></span>
              </div>
              <p className={!loading ? 'hidden' : ''}>Loading...</p>
            </div>
            {!isImageLoaded && (
              <div className="flex justify-between w-full max-w-md border-2a border-pink-700 bg-purple-200/60 text-purple-950 text-sm p-0.5 rounded-xl mt-10">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Describe what you want to generate"
                  className="flex-1 bg-transparent outline-none ml-4 max-sm:w-20 placeholder-color"
                />
                <button
                  type="submit"
                  className="flex justify-end items-center w-36 bg-purple-900a text-white mr-4 px-10a sm:px-16a py-3 rounded-mda"
                >
                  {/* <p>Generate</p> */}
                  <FontAwesomeIcon
                    className="text-2xl text-yellow-500"
                    icon="fa-solid fa-sun"
                  />
                </button>
              </div>
            )}

            {isImageLoaded && (
              <div className="flex gap-2 flex-wrap justify-center text-white max-sm:max-w-lg text-sm p-0.5 mt-10 rounded-full">
                <p
                  onClick={() => {
                    setIsImageLoaded(false);
                  }}
                  className="bg-transparent border border-purple-900 text-black sm:px-8 sm:py-3 max-sm:px-4 max-sm:py-2 rounded-full cursor-pointer"
                >
                  Generate Another
                </p>
                <a
                  className="bg-purple-950 sm:px-10 sm:py-3 max-sm:px-4 max-sm:py-2 rounded-full cursor-pointer"
                  href={image}
                  target="_blank"
                  download
                >
                  Download
                </a>
              </div>
            )}
          </motion.form>
        </div>

        {promptHistory.length && (
          <div
            id="image-history"
            className="flex items-center max-xl:hidden border-2a border-blue-500 w-[35%] h-[70vh] p-2 "
          >
            <div className="flexa items-centera bg-purple-700a w-[30%]a h-[60vh]a p-2 ">
              <div
                className="flex gap-3 fade-mask-right opacity-60 overflow-x-scroll hide-scroll-bar"
                ref={scrollRef}
                style={{ scaleX: scrollXProgress }}
                // initial={{ x: 800, scaleY: 0.7 }}
                // animate={{ x: 0, scaleY: 1 }}
                // transition={{
                //   duration: 0.3,
                //   delay: 0,
                //   ease: [0, 0.4, 0.1, 1.01],
                // }}
              >
                {promptHistory.map((item, index) => {
                  // if (index === 0) {
                  //   return <></>;
                  // }
                  return (
                    <img
                      className="rounded-lg hover:scale-101a transition-alla duration-100a ease-in-out acursor-pointer max-sm:w-10"
                      src={item.imageUrl}
                      alt=""
                      key={index}
                      width={300}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;
