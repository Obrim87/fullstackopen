import { createContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
