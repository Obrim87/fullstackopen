const _ = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0
    ? 'Blog list empty!'
    : blogs.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 'Error: your array is empty'
  // creates an object of counted authors using Lodash
  const countAuthors = _.countBy(blogs, 'author')
  // converts the object into an array
  let arr = Object.keys(countAuthors).map(author => ({ author, blogs: countAuthors[author] }))
  // sort the array
  arr = arr.sort((a,b) => a.blogs - b.blogs)
  // return last (highest) object
  return arr[arr.length - 1]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 'Error: your array is empty'
  let authors = []
  authors = blogs.map(blog => {
    if (!authors.includes(blog.author) || !authors) {
      return { author: blog.author, likes: blog.likes }
    }
  })
  let totalLikes = authors.reduce((prev, next) => {
    let author = next.author
    let found = prev.find(elem => {
      return elem.author === author
    })
    if (found) found.likes += next.likes
    else prev.push(next)
    return prev
  }, []).sort((a, b) => b.likes - a.likes)
  return totalLikes[0]
}

const multipleBlogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  // {
  //   _id: '5a422b891b54a676234d17fa',
  //   title: 'First class tests',
  //   author: 'Robert C. Martin',
  //   url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
  //   likes: 10,
  //   __v: 0
  // },
  // {
  //   _id: '5a422ba71b54a676234d17fb',
  //   title: 'TDD harms architecture',
  //   author: 'Robert C. Martin',
  //   url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  //   likes: 0,
  //   __v: 0
  // },
  // {
  //   _id: '5a422bc61b54a676234d17fc',
  //   title: 'Type wars',
  //   author: 'Robert C. Martin',
  //   url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  //   likes: 2,
  //   __v: 0
  // },
  // {
  //   _id: '5a422b3a1b54a678334d17f9',
  //   title: 'Canonical string reduction part 2',
  //   author: 'Edsger W. Dijkstra',
  //   url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  //   likes: 10,
  //   __v: 0
  // },
]

const singleBlogList = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'who knows',
    url: 'http://www.someurlimadeup.com',
    likes: 69,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const dummyUser = {
  username: 'dummyUser',
  name: 'Dummy User',
  password: 'iamadummy'
}

const loginDetails = {
  username: 'dummyUser',
  password: 'iamadummy'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  multipleBlogList,
  singleBlogList,
  nonExistingId,
  blogsInDb,
  dummyUser,
  loginDetails,
  usersInDb,
}