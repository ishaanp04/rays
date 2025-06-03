import React, { useContext } from 'react';
import { motion } from 'motion/react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredits = () => {
  const { user, backendUrl, token, setShowLogin, loadCreditsData } =
    useContext(AppContext);

  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verify-razor',
            res,
            { headers: { token } }
          );

          if (data.success) {
            await loadCreditsData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate('/home');
            toast.success('Credits added');
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/pay-razor',
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      className="min-h-[80vh] text-center pt-14 mb-10"
      initial={{ opacity: 0.2, y: 10 }}
      transition={{ duration: 0.8, ease: [0, 0.4, 0.1, 1.01] }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button> */}
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose your plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            className="bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-300 ease-out"
            key={index}
          >
            <img className="w-10" src={assets.rays_logo} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">₹ {item.price}</span> /{' '}
              {item.credits}
            </p>
            <button
              onClick={() => {
                paymentRazorpay(item.id);
              }}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">Test Card Number: 4386 2894 0766 0153</div>
    </motion.div>
  );
};

export default BuyCredits;
