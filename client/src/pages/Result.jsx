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
      <div className="relative">
        <motion.form
          onSubmit={onSubmitHandler}
          className="flex flex-col min-h-[80vh] justify-center items-center"
          initial={{ opacity: 0.2, y: 10 }}
          transition={{ duration: 0.6, ease: [0, 0.4, 0.1, 1.01] }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="relative border-6 border-dashed border-purple-900 rounded">
              {isImageLoaded && (
                <h1 className="text-center text-2xl font-semibold mb-2 max-w-sm min-w-sm overflow-auto scroll-m-4">
                  {input}
                </h1>
              )}
              {image ? (
                <motion.img
                  className="max-w-sm rounded m-2"
                  src={image}
                  alt=""
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              ) : (
                <div className="flex flex-col bg-purple-100 m-2 max-w-sm min-w-sm aspect-square text-center justify-center">
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
            // <div className="flex w-full max-w-xl gap-4 justify-center  mt-10 ">
            <div className="flex w-full max-w-xl bg-purple-200/60 text-purple-950 text-sm p-0.5 rounded-xl mt-10">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Describe what you want to generate"
                className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
              />
              <button
                type="submit"
                className="flex justify-end items-center w-36 bg-purple-900a text-white mr-8 px-10a sm:px-16a py-3 rounded-mda"
              >
                {/* <p>Generate</p> */}
                <FontAwesomeIcon
                  className="text-2xl text-yellow-500"
                  icon="fa-solid fa-sun"
                />
              </button>
              {/* </div> */}
            </div>
          )}

          {isImageLoaded && (
            <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
              <p
                onClick={() => {
                  setIsImageLoaded(false);
                }}
                className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
              >
                Generate Another
              </p>
              <a
                className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
                href={image}
                target="_blank"
                download
              >
                Download
              </a>
            </div>
          )}
        </motion.form>
        {promptHistory.length && (
          <div className="flex w-[100%] justify-between absolute top-0 px-12">
            <motion.div
              className="absolutea top-0a bg-purple-800/20a rounded-xla w-[28%] h-[75vh]"
              initial={{ x: -500, scaleY: 0.7 }}
              animate={{ x: 0, scaleY: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
                ease: [0, 0.4, 0.1, 1.01],
              }}
            >
              <div className="flex bg-purple-800/20a h-full">
                <div className="flex flex-col bg-purple-400/50a p-4 w-full max-h-[60%] mt-20 shadow-md rounded-md my-autoa">
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
            <div className="flex items-center max-xl:hidden bg-blue-700a w-[35%] h-[70vh] p-2 ">
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
          </div>
        )}
      </div>
    </>
  );
};

export default Result;
