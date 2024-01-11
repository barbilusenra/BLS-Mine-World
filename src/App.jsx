/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { ArrowLeftOnRectangleIcon, PlusSmallIcon } from '@heroicons/react/24/solid'
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Ground from "./components/Ground";
import FirstPointView from "./components/FPV";
import Player from "./components/Player";
import Cubes from './components/Cubes';
import TextureSelect from './components/TextureSelect';
import Login from './components/Login';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth as getAuth } from '../firebase';
import { useContext, useEffect, useState } from 'react';
import Menu from './components/Menu';
import Swal from 'sweetalert2';

function App() {

  const auth = getAuth;
  const [logged, setLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogged(true);
    } else {
      setLogged(false)
    }
  });

  const handleLogout = () =>{
    Swal.fire({
      icon: "warning",
      iconColor:"#D2D2BC",
      background:"#F8F5F1",
      buttonsStyling:false,
      customClass: {
        confirmButton: "confirmSwalCheckout",
        denyButton: "denySwalCheckout",
        htmlContainer: "htmlContainer",
        title: "swalTitle",
      },
      title: `Wowowo!...`,
      html: `<p>Are you sure you want to logout?</p>`,
      showConfirmButton: true,
      confirmButtonText: "Yeps!",
      showDenyButton: true,
      denyButtonText:"Cancel",
      toast: true
    }).then(async(result) => {
      if(result.isConfirmed){
          signOut(auth);
      }else if(result.isDenied){
        return;
      }
    })
  };
  
  
  if(!logged) return <Login/>
  

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]}/>
        <ambientLight intensity={0.5}/>
        <FirstPointView/>
        
        <Physics>
          <Cubes/>
          <Player/>
          <Ground/>
        </Physics>
      </Canvas>
      
      <TextureSelect/> 
      <Menu/>
      <div className='absolute bottom-5 left-5 z-[998]' onClick={handleLogout}>
        <ArrowLeftOnRectangleIcon className='h-6 w-6 text-white cursor-pointer hover:opacity-70'/>
      </div>
      <div className="pointer">
        <PlusSmallIcon style={{width: "40px", height:"40px", opacity: 0.5}}/>
      </div>
    </>
  )
}

export default App
