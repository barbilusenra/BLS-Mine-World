/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import Swal from "sweetalert2";
import CreateModal from "../modals/CreateModal";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import ShowWorlds from "../modals/Worlds";
import { ArrowPathIcon, PlusIcon, ServerStackIcon } from "@heroicons/react/24/solid";


const Menu = () => {

  const [resetWorld, cubes, setCubes] = useStore(state => [state.resetWorld, state.cubes, state.setCubes]);
  const [hideMenu, setHideMenu] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openWorlds, setOpenWorlds] = useState(false);

  const handleReset = () =>{
    Swal.fire({
      icon: "warning",
      iconColor:"#c54e17",
      background:"#eca88d",
      buttonsStyling:false,
      customClass: {
        confirmButton: "confirmSwalCheckout",
        denyButton: "denySwalCheckout",
        htmlContainer: "htmlContainer",
        title: "swalTitle",
      },
      title: `Wowowo!...`,
      html: `<p>Are you sure you want to reset your world?</p>`,
      showConfirmButton: true,
      confirmButtonText: "Yeps!",
      showDenyButton: true,
      denyButtonText:"Cancel",
      toast: true
    }).then(result => {
      if(result.isConfirmed){
        resetWorld();
      }else if(result.isDenied){
        return;
      }
    });
  };
  
  const user = auth.currentUser;


  const [ worlds ] = useCollection(
    collection(db, "users", user.uid, "worlds")
  );
  
  

  const [ currentWorld ] = useCollection(
    collection(db, "users", user.uid, "currentWorld")
  );
 
  const currentWorldName = currentWorld?.docs[0]?.data().name;



  const handleSave = async() =>{
    const notification = toast.loading("Saving...");

    try{
      await setDoc(doc(db, "users", user.uid, "worlds", currentWorldName),{
        cubes: cubes
      });
      toast.success("Your world has been saved!", {
        id: notification
      })
      setTimeout(()=>{
        toast.remove(notification);
      },500);
    }catch(error){
      toast.error("Something went wrong saving your world!", {
        id: notification
      })
      console.log(error);
      return;
    }
  };


  
  useEffect(() => {
    if(currentWorldName && worlds.docs.length){
      const findWorld = worlds.docs.find(doc => doc.id === currentWorldName);

    
      // NOTE: Check this, when deleting world that is active but having more worlds this crash
      const myCubes = findWorld?.data().cubes;

      if(myCubes) setCubes(myCubes);
      
    }
  }, [currentWorldName, worlds]);
  
  useEffect(() => {
    const handleKeyPress = (event) =>{
      const {code} = event;
      if(code === "KeyM" && !openCreate){
        setHideMenu(!hideMenu)    
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return ()=> {
      document.removeEventListener("keydown", handleKeyPress);
    }
    
  }, [hideMenu, openCreate]);

  return ( 
    <div className={`absolute top-5 left-0 px-5 flex items-center justify-between w-full h-fit ${hideMenu ? "opacity-0 invisible" : "opacity-1 visible"} transition-all duration-300`}>
      <Toaster/>
      {openCreate && <CreateModal setOpenCreate={setOpenCreate}/>}
      {openWorlds && <ShowWorlds setOpenWorlds={setOpenWorlds} worlds={worlds} currentWorld={currentWorldName} userUid={user?.uid}/>}
      <div className="flex items-center space-x-4">
        <PlusIcon onClick={()=> setOpenCreate(true)} className='h-5 w-5 text-white cursor-pointer hover:scale-105 transition-transform duration-300' title="New World"/>
        
        <button disabled={true} className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none border-none bg-transparent">
          <ServerStackIcon
            className='h-5 w-5 text-white hover:scale-105 transition-transform duration-300' 
            
            onClick={handleSave} 
            title="Save World"
            />
        </button>

        <ArrowPathIcon title="Reset World" onClick={handleReset} className='h-5 w-5 text-white cursor-pointer hover:scale-105 transition-transform duration-300'/>
      </div>

      {currentWorld?.docs[0]?.data().name && (
        <div
         onClick={()=> setOpenWorlds(true)}
         className="w-[170px] bg-[url('/images/CubicPixel.jpeg')] p-1 bg-cover bg-center bg-no-repeat cursor-pointer"
         >
          <div className="bg-[#f4f2f0] p-3">
            <p className="text-gray-400 text-xs fonty">Current World</p>
            <p className="font-bold text-[#1f1f1f] text-sm tracking-wider">{currentWorld?.docs[0]?.data().name}</p>
          </div>
        </div>
      )}
    </div>
   );
}
 
export default Menu;