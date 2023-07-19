const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('when only 1 blog in list, show likes of that blog', () => {
    expect(listHelper.totalLikes(listHelper.singleBlogList)).toBe(5)
  })
  test('when multiple blogs, calculate correctly', () => {
    expect(listHelper.totalLikes(listHelper.multipleBlogList)).toBe(24)
  })
})

describe('favourite blog', () => {
  test('deal with empty array', () => {
    expect(listHelper.favouriteBlog([])).toBe('Blog list empty!')
  })
  test('find blog with the most likes', () => {
    expect(listHelper.favouriteBlog(listHelper.multipleBlogList)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('show which author has the most blogs and how many', () => {
    expect(listHelper.mostBlogs(listHelper.multipleBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
  test('single item array shows count correctly', () => {
    expect(listHelper.mostBlogs(listHelper.singleBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('empty array returns error', () => {
    expect(listHelper.mostBlogs([])).toBe('Error: your array is empty')
  })
})

describe('most likes', () => {
  test('show which author has the most likes and how many', () => {
    expect(listHelper.mostLikes(listHelper.multipleBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
  test('single item array shows count correctly', () => {
    expect(listHelper.mostLikes(listHelper.singleBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('empty array returns error', () => {
    expect(listHelper.mostLikes([])).toBe('Error: your array is empty')
  })
})

describe('backend tests', () => {
  const createToken = async () => {
    const loginDetails = listHelper.loginDetails
    await api // create user
      .post('/api/users')
      .send(listHelper.dummyUser)
    const response = await api // login as the test user and create API token
      .post('/api/login')
      .send(loginDetails)
    return response.body.token
  }
  // deletes and recreates the array of blogs before each test
  // deletes all users and creates a new dummy user before each test
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for (let blog of listHelper.multipleBlogList) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  describe('when there are initially some notes saved', () => {
    test('check all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(listHelper.multipleBlogList.length)
    })

    test('check db is returning \'id\' property. Not \'_id\'', async () => {
      const response = await api.get('/api/blogs')
      const random = Math.floor(Math.random() * listHelper.multipleBlogList.length)
      expect(response.body[random].id).toBeDefined()
    })
  })

  describe('adding a new blog', () => {
    test('verify new blog post created', async () => {
      const token = await createToken()
      const response = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(listHelper.singleBlogList[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)
      expect(response.body.title).toEqual(listHelper.singleBlogList[0].title)
      const blogsInDb = await api.get('/api/blogs')
      expect(blogsInDb.body.length).toEqual(listHelper.multipleBlogList.length + 1)
    })

    test('check that if likes is blank, it defaults to 0', async () => {
      const blog = {
        title: 'This is a title',
        author: 'Michael OBrien',
        url: 'www.myurl.com'
      }
      const token = await createToken()
      const response = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      expect(response.body.likes).toEqual(0)
    })

    test('check that 400 bad request is sent if title is missing', async () => {
      const blog = {
        author: 'Michael OBrien',
        url: 'www.myurl.com'
      }
      const token = await createToken()
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('check that 400 bad request is sent if url is missing', async () => {
      const blog = {
        title: 'This is a title',
        author: 'Michael OBrien',
      }
      const token = await createToken()
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('deleting a blog post', () => {
    test('check a blog is successfully deleted', async () => {
      const initialBlogs = await listHelper.blogsInDb()
      const token = await createToken()
      const blogToDelete = await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(initialBlogs[0])
        .expect(201)

      await api
        .delete(`/api/blogs/${blogToDelete.body.id}`)
        .set('Authorization', token)
        .expect(204)

      const blogs = await listHelper.blogsInDb()
      expect(blogs.length).toEqual(initialBlogs.length)

      const ids = blogs.map(blog => blog.id)
      expect(ids).not.toContain(blogToDelete.body.id)
    })

    test('check that nothing is deleted when using an invalid ID', async () => {
      const initialBlogs = await listHelper.blogsInDb()
      const invalidId = await listHelper.nonExistingId()

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(404)

      const blogs = await listHelper.blogsInDb()
      expect(blogs.length).toEqual(initialBlogs.length)
    })
  })

  describe('updating a blog post', () => {
    test('ensure that a blog is updated', async () => {
      const blogs = await listHelper.blogsInDb()
      const updatedBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 999,
      }

      const response = await api
        .put(`/api/blogs/${blogs[0].id}`)
        .send(updatedBlog)
        .expect(200)
      expect(response.body).toMatchObject(updatedBlog)
    })

    test('returns null if id doesnt exist', async () => {
      const invalidId = await listHelper.nonExistingId()
      const updatedBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 999,
      }

      const response = await api
        .put(`/api/blogs/${invalidId}`)
        .send(updatedBlog)
        .expect(200)

      expect(response.body).toBe(null)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da5907'
      const updatedBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 999,
      }

      const response = await api
        .put(`/api/blogs/${invalidId}`)
        .send(updatedBlog)
        .expect(400)

      expect(response.body).toEqual({ error: 'malformatted id' })
    })
  })

  describe('user creation', () => {
    test('user is not created if username is not given', async () => {
      const usersAtStart = listHelper.usersInDb
      const newUser = {
        username: '',
        name: 'test',
        password: 'password',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(response.body).toEqual({ error: 'User validation failed: username: Path `username` is required.' })
      expect(listHelper.usersInDb).toHaveLength(usersAtStart.length)
    })

    test('user is not created if password is not given', async () => {
      const usersAtStart = listHelper.usersInDb
      const newUser = {
        username: 'testing',
        name: 'test',
        password: '',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(response.body).toEqual({ error: 'you must enter a password' })
      expect(listHelper.usersInDb).toHaveLength(usersAtStart.length)
    })

    test('user is not created if username is under 3 characters', async () => {
      const usersAtStart = listHelper.usersInDb
      const newUser = {
        username: 'te',
        name: 'test',
        password: 'password',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(response.body).toEqual({
        error: `User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`
      })
      expect(listHelper.usersInDb).toHaveLength(usersAtStart.length)
    })

    test('user is not created if password is under 3 characters', async () => {
      const usersAtStart = listHelper.usersInDb
      const newUser = {
        username: 'testing',
        name: 'test',
        password: 'pa',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(response.body).toEqual({ error: 'password must be at least 3 characters in length' })
      expect(listHelper.usersInDb).toHaveLength(usersAtStart.length)
    })

    test('if a username is not unique, return an error and dont create that user', async () => {
      const newUser = {
        username: 'testing',
        name: 'test',
        password: 'password',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

      const usersAtStart = listHelper.usersInDb

      const duplicateResponse = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(duplicateResponse.body).toEqual({
        error: `User validation failed: username: Error, expected \`username\` to be unique. Value: \`${newUser.username}\``
      })
      expect(listHelper.usersInDb).toHaveLength(usersAtStart.length)
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})