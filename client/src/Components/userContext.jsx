import {createContext, useContext, useState} from "react";

const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [userName, setUsername] = useState('')

    const setUserData = (name)=> {
        setUsername(name)
    }

    return(
        <UserContext.Provider  value={{userName, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = ()=>{
    const context = useContext(UserContext)
    if(!context){
        throw new Error('error from userContext')
    }
    return context
}