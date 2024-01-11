/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import toast, { Toaster } from 'react-hot-toast';
import { FaceFrownIcon, TrashIcon } from "@heroicons/react/24/solid"
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Swal from 'sweetalert2';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect } from 'react';


const ShowWorlds = ({setOpenWorlds, userUid}) => {
  
  const [ worlds ] = useCollection(
    collection(db, "users", userUid, "worlds")
  );

  const [ currentWorld ] = useCollection(
    collection(db, "users", userUid, "currentWorld")
  );
 
  const currentWorldName = currentWorld?.docs[0]?.data().name;


  const handleChangeWorld = async(worldSelected) =>{
    if(worldSelected !== currentWorldName){
      const notification = toast.loading("Changing world...");

      const docRef = doc(db, "users", userUid, "currentWorld", "current");
      await updateDoc(docRef, {
        name: worldSelected
      }) 

      toast.success(`Welcome to ${worldSelected}`, {
        id: notification
      })

      setTimeout(()=>{
        setOpenWorlds(false)
      },500)
    }
  };
  

  const handleDeleteWorld = async(worldId) =>{
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
      html: `<p>Are you sure you want to delete this world?</p>`,
      showConfirmButton: true,
      confirmButtonText: "Yeps!",
      showDenyButton: true,
      denyButtonText:"Cancel",
      toast: true
    }).then(async(result) => {
      if(result.isConfirmed){
        const notification = toast.loading("Deleting...");

        await deleteDoc(doc(db, "users", userUid, "worlds", worldId));
        
        if(worldId === currentWorldName){
          if(worlds?.docs.length > 0){
            
            await setDoc(doc(db, "users", userUid, "currentWorld", "current"), {
              name: worlds.docs[0].id
            });
          }
        }
        
        toast.success("Your world has been deleted!", {
          id: notification
        })

        setTimeout(()=>{
          setOpenWorlds(false)
        },500)
      }else if(result.isDenied){
        return;
      }
    });

  };

  useEffect(() => {
    (async()=>{
      if(worlds?.docs.length === 0 && currentWorldName){
        await deleteDoc(doc(db, "users", userUid, "currentWorld", "current"));
      }
    })()
  }, [worlds, currentWorldName, userUid]);
  
  return ( 
    <article className="fixed top-0 left-0 w-full h-screen max-h-screen bg-black/40 flex items-center justify-center z-[1000]" onClick={()=> setOpenWorlds(false)}>
      <Toaster/>
      <div className="bg-[url('/images/CubicPixel.jpeg')] p-3" onClick={(e)=> e.stopPropagation()}>
        <div className="bg-white border-[4px] border-white min-h-[400px] max-h-[400px] overflow-y-auto min-w-[400px] lg:w-[500px] flex flex-col justify-start">
          <h1 className="font-bold text-2xl p-4">My Worlds</h1>
          <div className='bg-[#f5f5f5] p-4 flex items-start flex-col w-full'>
            {worlds?.docs.length ? (

              worlds?.docs.map((doc, index) => {
                return(
                  <div key={doc.id} onClick={()=> handleChangeWorld(doc.id)} className={`p-4 ${index > 0 && "border-t-2 border-gray-400/30"} w-full flex items-center justify-between hover:bg-[#eae8e8] transition-colors duraation-400 cursor-pointer`}>
                    <div className='flex items-center space-x-2'>
                      <img src="/images/worldIcon.png" alt="worldIcon" className='w-10 object-contain' />
                      <h4 className='fonty text-sm tracking-wide'>{doc.id}</h4>
                    </div>
                    <div className='flex items-center space-x-2' onClick={(e)=> e.stopPropagation()}>
                      {currentWorldName && doc.id === currentWorldName && (
                        <span className='text-4xl -mt-1 animate-pulse text-green-600'>•</span>
                      )}
                      <TrashIcon className='h-4 w-4 cursor-pointer hover:opacity-70' onClick={()=> handleDeleteWorld(doc.id)}/>
                    </div>
                  </div>
                )
              })

            ) : (
              <div className='flex items-center justify-center flex-col w-full py-[6rem]'>
                <FaceFrownIcon className='h-5 w-5'/>
                <p>{"You don't have any worlds!"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default ShowWorlds;