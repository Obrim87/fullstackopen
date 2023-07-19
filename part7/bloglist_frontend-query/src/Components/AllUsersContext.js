import { createContext, useState } from 'react'

const AllUsersContext = createContext()

export const AllUsersContextProvider = (props) => {
  const [allUsers, setAllUsers] = useState([])

  return (
    <AllUsersContext.Provider value={[allUsers, setAllUsers]}>
      {props.children}
    </AllUsersContext.Provider>
  )
}

export default AllUsersContext
