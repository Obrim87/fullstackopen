const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user // user extraction from token is handled in middleware by helper function
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).send({ error: 'Blog does not exist. Please check the id is correct' })
  }

  if (user.id === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  response.json({ error: 'Only the user who created this blog is authorized to delete it.' })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user // request.user is created by decoding the provide token in the API call in middleware

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter