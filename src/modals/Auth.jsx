/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { slideAnimation, headTextAnimation, headContentAnimation } from "../config/motion";

// GOOGLE FIREBASE
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth as getAuth } from "../../firebase";
import { useAddress, useMetamask } from "@thirdweb-dev/react";



const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0
  },
  visible:{
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exit:{
    y: "100vh",
    opacity: 0
  }
}


const AuthModal = ({close, metamaskMe, setMetamaskMe}) => {
  

  
  // Guest Button States
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const guestRef = useRef();



  // Metamask
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  // Auth
  const auth = getAuth;
  const GoogleProvider = new GoogleAuthProvider();
  const GitHubProvider = new GithubAuthProvider();
  const FacebookProvider = new FacebookAuthProvider();
  const TwitterProvider = new TwitterAuthProvider();

  
  const handleLogin = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        
        const user = result.user;
        console.log(user);
        
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
        
      });
  }

  const handleMetamask = () =>{
    connectWithMetamask();
    setMetamaskMe(true);
  };


  useEffect(() => {
    if(isHovered){
      setTimeout(()=>{
        setShowText(true)
      },300)
    }else{
      setShowText(false);
    }
  }, [isHovered]);

  

  useEffect(() => {
    if(address && metamaskMe){
      const email = `${address}@metamask.com`;
      const password = address + "3003WorldPassword";

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch(error => {
        if(error.message === "Firebase: Error (auth/email-already-in-use)."){
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) =>{
            return console.log(userCredential);
          })
          .catch(error =>{
            return console.log(error);
          })
        }
      })
    }
  }, [address, metamaskMe]);
 
  return ( 
    <motion.article className="h-screen fixed top-0 left-0 w-full flex items-center justify-center" onClick={()=> close(false)}>
      <motion.div 
        onClick={(e)=> e.stopPropagation()}
        drag
        className="flex item-center justify-center flex-col text-white w-fit"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-center w-fit mx-auto">
          <div className="border-[5px] border-white/50 rounded-sm flex items-center max-w-xl w-[24rem] sm:w-[36rem] backdrop-blur-sm">
            <img src="/images/LoginModal.png" alt="Wallpaper" className="max-w-lg hidden sm:flex h-[23rem] lg:h-[28rem] rounded-sm object-contain border-r-[4px] border-white/50"/>
            <div className="flex-1 p-1 h-[23rem] lg:h-[28rem]">
              <div className="bg-white/50 w-full h-full flex items-center flex-col space-y-3 justify-center relative">
                <motion.button 
                onClick={()=> handleLogin(GoogleProvider)}
                whileHover={{scale: 1.05}} 
                className="flex justify-center items-center space-x-3 bg-white px-10 py-[0.6rem] rounded-sm"
                >
                  <img src="/images/googleIcon.svg" alt="googleIcon" className="h-[16px] w-[15px] m-0" />
                  <div className="text-sm fonty tracking-wide flex items-center -mb-1">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-600">o</span>
                    <span className="text-yellow-400">o</span>
                    <span className="text-blue-500">g</span>
                    <span className="text-green-600">l</span>
                    <span className="text-red-600">e</span>
                  </div>
                </motion.button>
                {/* <motion.button onClick={()=> handleLogin(FacebookProvider)} whileHover={{scale: 1.05}} className="flex justify-center items-center space-x-3 bg-[#3B5998] px-[1.99rem] py-2 rounded-sm">
                  <i className="fa-brands fa-facebook"></i>
                  <span className="text-sm fonty tracking-wide">Facebook</span>
                </motion.button> */}
                <motion.button onClick={()=> handleLogin(GitHubProvider)} whileHover={{scale: 1.05}} className="flex justify-center items-center space-x-3 bg-black px-10 py-2 rounded-sm">
                  <i className="fa-brands fa-github-alt"></i>
                  <span className="text-sm fonty tracking-wide">GitHub</span>
                </motion.button>
                <motion.button onClick={()=> handleLogin(TwitterProvider)} whileHover={{scale: 1.05}} className="flex justify-center items-center space-x-3 bg-cyan-800 px-10 py-2 rounded-sm">
                  <i className="fa-brands fa-twitter text-cyan-500"></i>
                  <span className="text-sm fonty tracking-wide">Twitter</span>
                </motion.button>
                <motion.button onClick={handleMetamask} whileHover={{scale: 1.05}} className="flex justify-center items-center space-x-2 bg-orange-700 px-5 py-[0.45rem] rounded-sm">
                  <img src="https://docs.metamask.io/img/metamask-logo.svg" alt="MetaMask Icon" className="w-28"/>
                </motion.button>
                <motion.button
                  className={`cursor-default bg-black/70 px-7 py-3 h-[44px] transition-all duration-400 text-sm fonty flex items-center gap-3 justify-center absolute bottom-1 left-1 right-1`}
                >
                    <motion.span {...headTextAnimation}>Login to continue</motion.span>
                    <motion.i {...headContentAnimation} className="fa-solid fa-user-secret text-[#f7f7f7]"></motion.i>
                  
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
   );
}
 
export default AuthModal;