/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const GlobalContext = createContext();


export const ContextProvider = ({children}) =>{
  
  const [isGuest, setIsGuest] = useState(false);

  const data = {
    isGuest,
    setIsGuest
  }

  return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
};