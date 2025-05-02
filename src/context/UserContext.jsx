import React, { createContext, useState } from 'react'



// Create a context for user management
export const UserContextInfo = createContext();


function UserContext({children}) {
    const [user, setUser] = useState(null);
  return (
    <UserContextInfo.Provider value={{user, setUser}}>
        {children}
    </UserContextInfo.Provider>
  )
}

export default UserContext;