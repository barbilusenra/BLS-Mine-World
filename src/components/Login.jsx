/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

import {
  headContainerAnimation,
  headTextAnimation,
  headContentAnimation,
  slideAnimation
} from "../config/motion";
import React, {useEffect} from 'react';

import AuthModal from "../modals/Auth";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth as getAuth } from "../../firebase";
import { useNavigate } from "react-router";
import { TailSpin } from "react-loader-spinner";


const Login = () => {

  const navigate = useNavigate();
  const [mounting, setMounting] = useState(true);

  const [metamaskMe, setMetamaskMe] = useState(false);

  const auth = getAuth;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      if(!userLogged){
        setUserLogged(true);
        setMetamaskMe(false);
      }
      if(openLogin){
        setOpenLogin(false)
      }
      
    } else {
      if(userLogged){
        setUserLogged(false)
      }
    }
  });

  const [openLogin, setOpenLogin] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  
  const handleLogin = () =>{
    if(userLogged){
      return;
    }else{
      setOpenLogin(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setMounting(false);
    }, 2000);
  }, []);

  return ( 
    <AnimatePresence>
    <div className="bg-slate-400 h-screen max-h-screen w-full relative bg-[url('/images/mineLogi.jpg')] bg-cover bg-center bg-no-repeat">
      

      {openLogin && !userLogged && <AuthModal close={setOpenLogin} metamaskMe={metamaskMe} setMetamaskMe={setMetamaskMe}/>}

      <motion.div className={`w-full flex items-center justify-center absolute ${(openLogin && !userLogged) ? "-top-[100vh]" : "top-10"} transition-all duration-400 z-50`} {...slideAnimation("down")}>
        <img src="/images/bls-world.png" alt="3003 World" className="w-[28rem] sm:w-auto cursor-pointer" onClick={()=> signOut(auth)}/>
      </motion.div>

      <div className={`flex items-center justify-center w-full space-x-20 px-2 sm:px-0 absolute left-1/2 -translate-x-1/2 transition-all duration-400 ${(openLogin && !userLogged) ? "-bottom-[100vh]" : "bottom-20"}`}>
        <motion.div className="flex items-center flex-col space-y-2 justify-center" {...slideAnimation("up")}>
          {userLogged ? (
            <>
              <img src="/images/Sword.png" alt="myWorld" className="w-[5.5rem] h-[5.5rem] object-contain sm:w-36 sm:h-36 md:w-40 md:h-40 hover:scale-105 transition-transform duration-300 cursor-pointer"/>
              <img src="/images/Play.png" alt="myWorldText" className="w-[4.2rem] md:w-20" />
            </>
          ):(
            <>
              <img src="/images/Sword.png" alt="myWorld" className="w-[5.5rem] h-[5.5rem] object-contain sm:w-36 sm:h-36 md:w-40 md:h-40 hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={handleLogin}/>
              <img src="/images/loginnn.png" alt="myWorldText" className="w-[4.2rem] md:w-20" />
            </>
          )}
        </motion.div>
        <motion.div className="flex items-center flex-col space-y-2 justify-center" {...slideAnimation("up")}>
          <img src="/images/myInstructions.png" alt="myWorld" className="w-[5.5rem] h-[5.5rem] object-contain sm:w-36 sm:h-36 md:w-40 md:h-40 hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={()=> navigate("/instructions")}/>
          <img src="/images/instructions.png" alt="myWorldText" className="w-40 md:w-48" />
        </motion.div>
        <motion.div className="flex items-center flex-col space-y-2 justify-center" {...slideAnimation("up")}>
          <img src="/images/myWorld.png" alt="myWorld" className="w-[5.5rem] h-[5.5rem] object-contain sm:w-36 sm:h-36 md:w-40 md:h-40 hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={()=> navigate("/bls-world")}/>
          <img src="/images/worldd.png" alt="myWorldText" className="w-20 md:w-24" />
        </motion.div>
      </div>
    </div>

    </AnimatePresence>
   );
}
 
export default Login;