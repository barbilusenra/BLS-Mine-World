/* eslint-disable react-refresh/only-export-components */
import { BiSolidLeftArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideAnimation } from "../config/motion";
import routeTransition from "../config/transition";

const WorldInfo = () => {
  return ( 
    <div className="bg-slate-300 h-screen max-h-screen w-full flex items-center justify-center relative bg-[url('/images/mineTop.png')] bg-cover bg-center bg-no-repeat">
      <Link to="/" className="back-class absolute top-5 left-5 bg-white/30 p-1 border-[3px] border-white/60 flex items-center justify-center cursor-pointer">
        <BiSolidLeftArrow className="h-5 w-5 md:h-6 md:w-6 text-stone-500" />
      </Link>

      <motion.div className="bg-white/80 mx-auto text-sm fonty w-[32rem] border-[6px] flex items-center justify-center flex-col border-orange-800 rounded-sm backdrop-blur-sm px-3 py-6 text-stone-500" {...slideAnimation("left")}>
          <img src="/images/welcomebls-.png" alt="welcome" className="font-sans font-extrabold tracking-wide text-2xl mb-5" />
          <div className="p-3 leading-6 flex flex-col space-y-4">
            <div className="flex items-start space-x-2">
              <span>•</span>
              <p>Step into a realm where creativity knows no bounds. Immerse yourself in a universe of limitless possibilities, where the only constraints are those of your imagination. Our Minecraft world is a place of wonder and adventure, where you can craft, explore, and build your dreams into reality.</p>
            </div>
            <div className="flex items-start space-x-2">
              <span>•</span>
              <p>{"Whether you're a seasoned miner or a newbie, our Minecraft world offers a space for everyone. Unearth the secrets of this pixelated paradise and let your creativity soar. Forge your own path, leave your mark on the landscape, and become a legend in this blocky universe."}</p>
            </div>
            <div className="flex items-start space-x-2">
              <span>•</span>
              <p>Are you ready to take on the adventure of a lifetime? Dive into our Minecraft world now and let your journey begin!</p>
            </div>
          </div>
      </motion.div>
    </div>
   );
}
 
export default routeTransition(WorldInfo);