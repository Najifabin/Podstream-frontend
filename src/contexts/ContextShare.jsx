import React, { createContext, useState } from 'react'
export const addPodcastContext = createContext()
export const loginContext = createContext();


const ContextShare = ({children}) => {
    const [addPodcastResponse,setAddPodcastResponse] = useState("")
    const [userLogin,setUserLogin] = useState("")
  return (
    <loginContext.Provider value={{userLogin, setUserLogin}}>
      <addPodcastContext.Provider
        value={{
          addPodcastResponse,
          setAddPodcastResponse,
        }}
      >
        {children}
      </addPodcastContext.Provider>
    </loginContext.Provider>
  );
}

export default ContextShare