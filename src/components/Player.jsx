/* eslint-disable no-unused-vars */
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import useKeyboard from "../hooks/useKeyboard";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;

const Player = () => {

  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
    sitDown,
    dirt,
    grass,
    glass,
    wood,
    log,
    pinkWood
  } = useKeyboard();
  const actions = useKeyboard();


  // Para la rapidez de los frames, es mas rapido el useRef que los states.
  const pos = useRef([0, 0, 0]);
  const vel = useRef([0, 0, 0]);
  
  const { camera } = useThree();
  const [ ref, api ] = useSphere(()=> ({
    mass: 1,
    type: "Dynamic",
    position: [0, 0.5, 0]
  }))
  // 0.5 on the Y because the Ground has -0.5
  // X, Y, Z(Depth)


  // OBTENER VELOCIDAD Y POSITION DE ESFERA (PERSONAJE PRIMERA PERSONA)
  useEffect(() => {
    api.position.subscribe(p => {
      pos.current = p;
    })
  }, [api.position]);

  useEffect(() => {
    api.velocity.subscribe(p => {
      vel.current = p;
    })
  }, [api.velocity]);
  // ------


  useFrame(()=> {
    camera.position.copy(
      new Vector3(
        pos.current[0],
        pos.current[1],
        pos.current[2]
      )
    );
    
    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0,
    )


    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(CHARACTER_SPEED) //Walk: 5  Run: 10
      .applyEuler(camera.rotation)
      // Apply Euler makes the user move depending on camera position
    
    api.velocity.set(
      direction.x,
      vel.current[1], // Jump
      direction.z
    );


    if(jump && Math.abs(vel.current[1]) < 0.05){
      api.velocity.set(
        vel.current[0],
        CHARACTER_JUMP_FORCE,
        vel.current[2]
      )
    }
  })

  return ( 
    <mesh ref={ref}/>
   );
}
 
export default Player;