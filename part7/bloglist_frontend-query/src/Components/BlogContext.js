import { createContext, useState } from 'react'

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  const [blogs, setBlogs] = useState([])

  return (
    <BlogContext.Provider value={[blogs, setBlogs]}>
      {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContext
