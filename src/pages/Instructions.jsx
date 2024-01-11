/* eslint-disable react-refresh/only-export-components */

import transition from "../config/transition";
import { motion } from "framer-motion";
import { slideAnimation } from "../config/motion";
import { Link } from "react-router-dom";
import { BiSolidLeftArrow } from "react-icons/bi";

const Instructions = () => {
  

  return ( 
    <div className="bg-slate-400 h-screen max-h-screen w-full flex items-center justify-center relative bg-[url('/images/mineInstruct.jpg')] bg-cover bg-center bg-no-repeat">
      <Link to="/" className="back-class absolute top-5 left-5 bg-white/30 p-1 border-[3px] border-white/60 flex items-center justify-center cursor-pointer">
        <BiSolidLeftArrow className="h-5 w-5 md:h-6 md:w-6 text-stone-500" />
      </Link>

      <motion.div className="bg-white/60 mx-auto w-[32rem] border-[6px] flex items-center justify-center flex-col border-orange-800 rounded-sm backdrop-blur-sm px-3 py-6" {...slideAnimation("left")}>
        {/* <img src="/images/LavaInstructions.png" alt="Instructions" className="w-[20rem]"/> */}
        <div className="text-orange-900 flex items-start justify-center flex-col w-full fonty">
          <p className="font-semibold text-xl font-sans text-center mx-auto mb-5"><strong>Master Your World with These Controls:</strong></p>
          
          <div className="px-5 space-y-5 text-sm py-2">
            <p>• To move right, use the mighty <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">D</strong> key.</p>
            <p>• To move left, unleash the power of <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">A</strong>.</p>
            <p>• To move backwards, command the force of <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">S</strong>.</p>
            <p>• To move forward, embark on the journey with <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">W</strong>.</p>
            <p>• To ascend, launch into the sky with the <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">Spacebar</strong>.</p>
            <p>• To obliterate a cube, left-click, hold, and invoke <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">Shift</strong>.</p>
            <p>• To select textures, wield the magic of keyboard numbers.</p>
            <p>• To unveil or conceal textures, deploy the spell of letter <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">H</strong>.</p>
            <p>• To preserve your realm, safeguard it with the <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">SAVE</strong> button.</p>
            <p>• To restart your universe, reset it with the <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">RESET</strong> button.</p>
            <p>• To hide the menu, use the legendary <strong className="bg-[#eca88d] px-3 py-1 mr-1 text-xs tracking-wide font-mono border-2 border-orange-800">M</strong>.</p>
          </div>
        </div>
      </motion.div>
    </div>
   );
}
 
export default transition(Instructions);