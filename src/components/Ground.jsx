/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

const Ground = () => {

  const [ref] = usePlane(()=> ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0]
  }));

  // Math.PI would give us 180 deg, so the floor would be a circle, we divide it in 2 so is 90deg (plain)
  // x, y, z (3D) 


  const [addCube] = useStore(state => [state.addCube]);

  
  groundTexture.repeat.set(100, 100)
  
  const handleClickGround = (event) => {
    event.stopPropagation();
    
    const [x ,y, z] = Object.values(event.point).map(n => Math.ceil(n));
    
    return addCube(x, y, z);
    
  };

  return ( 
    <mesh 
      onClick={handleClickGround}
      ref={ref}
    >
      <planeGeometry attach="geometry" args={[100, 100]}/>
      <meshStandardMaterial attach="material" map={groundTexture}/>
    </mesh>
   );
}
 
export default Ground;