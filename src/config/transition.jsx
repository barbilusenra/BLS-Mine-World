/* eslint-disable react/display-name */
import { motion } from "framer-motion";

const routeTransition = (OgComponent) => {
  return () => (
    <>
      <OgComponent/>
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-[#000000] origin-bottom"
        initial={{scaleY: 0}}
        animate={{scaleY: 0}}
        exit={{scaleY: 1}}
        transition={{duration: 20, ease: [0.22, 1, 0.36, 1]}}
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-[#000000] origin-top"
        initial={{scaleY: 1}}
        animate={{scaleY: 0}}
        exit={{scaleY: 0}}
        transition={{duration: 2, ease: [0.22, 1, 0.36, 1]}}
      />
    </>
  )
};

export default routeTransition;