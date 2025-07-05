import { assets } from "../assets/assets";
import React,{useContext} from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {AppContext } from "../context/AppContext";



const Header = () => {
  const {removebg} = useContext(AppContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-8 px-6 md:px-20 mb-16 bg-gradient-to-bl from-white via-blue-50 to-white py-10">
      {/* Left side video banner */}
      <div className="order-2 md:order-1 flex justify-center">
        <div className="shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden w-full max-w-[400px]">
          <video
            src={assets.video_banner}
            autoPlay
            loop
            muted
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right side text content */}
      <div className="order-1 md:order-2">
      <motion.div
  className="order-1 md:order-2"
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          The fastest
          <span className="text-blue-500 block">background eraser.</span>
        </h1>
        <p className="text-gray-500 mb-8 text-lg leading-relaxed">
          Transform your photos with our background remover app! Highlight your
          subject and create a transparent background, so you can place it in a
          variety of new designs and destinations. Try it now and immerse your
          subject in a completely different environment!
        </p>

        <div>
          <input type="file" accept="image/*" id="upload1" hidden onChange={(e)=>
          removebg(e.target.files[0])
         }/>
          <label
            htmlFor="upload1"
            className="bg-black text-white font-medium px-8 py-4 rounded-full hover:opacity-90 transition-transform text-lg cursor-pointer inline-block"
         >
            Try Now
          </label>
          
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;