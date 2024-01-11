/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useStore } from "../hooks/useStore";
import * as images from "../images/images.js";
import  useKeyboard  from "../hooks/useKeyboard";
import { useEffect, useState } from "react";

const TextureSelect = () => {
  const [visible, setVisible] = useState(true);
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture]);

  const actions = useKeyboard();
  const {
    dirt,
    grass,
    glass,
    wood,
    log,
    pink,
    hideTextures
  } = actions;

  const options = {
    dirt,
    grass,
    wood,
    log,
    pink,
    glass
  };


  useEffect(() => {
    
    Object.entries(options).map(item => {
      if(item[1] === true){
        setTexture(item[0])
      }
    })

      
  }, [dirt, grass, wood, log, glass, pink]);

  if(!visible) return null


  return (
    <div className={`texture-select`} style={{left: hideTextures ? "-100vw" : "5%"}}>
      {Object.entries(images).map(item => (
        <img key={item[0]} src={item[1]} alt="texture-img" className={`${texture + "Img" === item[0] && "activeTexture"}`} />
      ))}
    </div>
  )
}
 
export default TextureSelect;