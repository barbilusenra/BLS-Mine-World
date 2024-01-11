/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";
import { useState } from "react";
import { useStore } from "../hooks/useStore";

const Cube = ({id, position, texture}) => {

  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(()=> ({
    type:"Static",
    position
  }));

  const [addCube, removeCube] = useStore(state => [state.addCube, state.removeCube]);

  const activeTexture = textures[texture + "Texture"];

  const handleClickCube = (e) =>{
    e.stopPropagation();
    if(e.shiftKey){
      removeCube(id);
      return;
    }
    
    const clickedFace = Math.floor(e.faceIndex / 2);
    const {x, y, z} = ref.current.position;
    if(clickedFace === 0){
      addCube(x + 1, y, z);
    }else if(clickedFace === 1){
      addCube(x - 1,y , z);
    }else if(clickedFace === 2){
      addCube(x, y + 1, z);
    }else if(clickedFace === 3){
      addCube(x, y - 1, z);
    }else if(clickedFace === 4){
      addCube(x, y, z + 1);
    }else if(clickedFace === 5){
      addCube(x, y, z - 1);
    }
    
  }

  return ( 
    <mesh
      onPointerOver={(e)=> {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={(e)=> {
        e.stopPropagation();
        setIsHovered(false);
      }}
      ref={ref}
      onClick={handleClickCube}
    >
      <boxGeometry attach="geometry"/>
      <meshStandardMaterial color={isHovered ? "lightgrey" : "white"} transparent opacity={texture === "glass" ? 0.5 : 1} map={activeTexture} attach="material"/>
    </mesh>
   );
}
 
export default Cube;