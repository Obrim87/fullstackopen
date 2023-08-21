const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => {
      console.log('bookCount')
      const allBooks = await Book.find({})
      return allBooks.length
    },
    authorCount: async () => {
      const allAuthors = await Author.find({})
      return allAuthors.length
    },
    allBooks: async (root, args) => {
      const allBooks = await Book.find({}).populate('author')
      if (!args.author && !args.genre) {
        return allBooks
      }
      if (args.author && args.genre) {
        return allBooks.filter(
          (book) =>
            book.author.name === args.author && book.genres.includes(args.genre)
        )
      }
      if (args.author) {
        return allBooks.filter((book) => book.author.name === args.author)
      }
      return allBooks.filter((book) => book.genres.includes(args.genre))
    },
    allAuthors: async () => {
      console.log('author.find')
      const allAuthors = await Author.find({})
      return allAuthors
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      let count = 0
      books.forEach((book) => {
        if (book.author.name === root.name) {
          count++
        }
      })
      return count
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre
      })
      return await newUser.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'hello') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const dataForToken = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(dataForToken, process.env.JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You must be logged in.', {
          extension: {
            code: 'FORBIDDEN'
          }
        })
      }
      const authors = await Author.find({})
      const findAuthor = authors.find((author) => author.name === args.author)

      if (!findAuthor) {
        const newAuthor = new Author({
          name: args.author,
          born: null
        })
        try {
          await newAuthor.save()
          const book = new Book({ ...args, author: newAuthor })
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return await book.save()
        } catch (error) {
          throw new GraphQLError('Name is too short.', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }
      const book = new Book({ ...args, author: findAuthor })
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return await book.save()
    },
    addAuthor: async (root, args) => {
      const author = new Author({ name: args.name })
      return await author.save()
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You must be logged in.', {
          extension: {
            code: 'FORBIDDEN'
          }
        })
      }
      if (!(await Author.find({ name: args.name }))) return null
      const updatedAuthor = {
        ...args,
        born: args.setBornTo
      }
      return await Author.findOneAndUpdate({ name: args.name }, updatedAuthor, {
        new: true
      })
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
