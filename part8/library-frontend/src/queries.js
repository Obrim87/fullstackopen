import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
      author {
        name
        id
        born
        bookCount
      }
      published
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author {
        name
        born
        id
        bookCount
      }
      genres
      id
      published
      title
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation updateBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query me {
    me {
      favouriteGenre
      username
      id
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      title
      published
      id
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        name
        id
        born
        bookCount
      }
      title
      published
      id
      genres
    }
  }
`
