/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useRef } from "react";
import { useStore } from "../hooks/useStore";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import  { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';


const CreateModal = ({setOpenCreate}) => {

  const inputRef = useRef();
  const [ cubes ] = useStore(state => [state.cubes]);
  const user = auth.currentUser;

  const [ worlds ] = useCollection(
    collection(db, "users", user.uid, "worlds")
  );
  
  

  const handleCreate = async()  =>{
 try {
  const notification = toast.loading("Creating...");
    
    if(!inputRef.current.value){
      toast.error("Please provide a name to your world!", {
        id: notification
      })
      return;
    }

    const worldName = inputRef.current.value;
    inputRef.current.value = "";

    const worldExist = worlds?.docs.find(doc => doc.id === worldName);
    if(worldExist){
      toast.error("You already have a World with that name!", {
        id: notification
      });
      return;
    }
    

    const document = {
      createdAt: serverTimestamp(),
      cubes
    };

    await setDoc(doc(db, "users", user.uid, "worlds", worldName), document);
    await setDoc(doc(db, "users", user.uid, "currentWorld", "current"),{
      name: worldName
    });

    toast.success("Your world has been created!", {
      id: notification
    })

    setTimeout(()=>{
      setOpenCreate(false);
      toast.remove(notification)
    },500)
 } catch (error) {
  console.log(error)
 }
    
  }

  return ( 
    <article className="fixed top-0 left-0 w-full h-screen max-h-screen bg-black/40 flex items-center justify-center z-[1000]" onClick={()=> setOpenCreate(false)}>
      <Toaster/>
      <div className="bg-[url('/images/CubicPixel.jpeg')] p-3" onClick={(e)=> e.stopPropagation()}>
        <div className="bg-white border-[4px] border-white h-fit w-[400px] lg:w-[500px] p-4 flex flex-col justify-end">
          <h1 className="font-bold text-orange-900 text-2xl">{"Hey Crafter! What's up?"}</h1>
          <p className="text-orange-900 text-xs tracking-wider mb-5 mt-2">{"Are you trying to create an empire? Great! Just tell us the name of your World and we'll create it for you! Don't worry, we'll automaticaly save your current progress."}</p>
          <div className="border-[4px] border-[#ad6244] flex flex-col">
            <input ref={inputRef} type="text" placeholder="Name your world..." className="px-3 py-3 pt-6 fonty text-sm text-orange-400 tracking-wide border-2 border-[#6b4316] outline-none bg-[#f7f7f7]"/>
            <button 
              className="bg-[#cf7450] text-orange-950 px-3  tracking-wider py-3 border-none text-sm font-bold hover:opacity-80 outline-none"
              onClick={handleCreate}
            >Create</button>
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default CreateModal;