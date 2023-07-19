import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const allUsers = [
  {
    username: 'micko',
    name: 'Michael',
    blogs: [
      {
        title: 'My awesome ddrrblog',
        author: 'some guydrrd',
        url: 'www.myawesomerrblogdd.com.au',
        id: '645abe1b739ad94b998b91de'
      },
      {
        title: 'My crappy blog',
        author: 'some other guy',
        url: 'www.mycrappyblog.com.au',
        id: '645abf842b891bb4235c83f3'
      },
    ],
    id: '6452e4a5483f88bb1f6a5765'
  }
]

const loggedInUser = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvbmphIiwiaWQiOiI2NDU0MjViNjQ4M2Y4OGJiMWY2YTU3NmEiLCJpYXQiOjE2ODY3NzgyNTh9.wNiND5F4TvGyk0HO7whr6-kXXSIVLDUUQrNLZuT_6Jc',
  username: 'honja',
  name: 'Sonja',
  id: '645425b6483f88bb1f6a576a'
}

const blog = {
  author: 'mike hunt',
  title: 'the truth about hunt',
  url: 'www.mikehunt.com',
  likes: 69420,
  id: '645abe1b739ad94b998b91de',
  user: {
    username: 'micko',
    name: 'Michael',
    id: '6452e4a5483f88bb1f6a5765'
  }
}

describe('Blog', () => {
  test('checks that a blog renders title and author, but not URL or likes by default', () => {

    render(<Blog blog={blog} />)

    screen.getByText('mike hunt')
    screen.getByText('the truth about hunt', { exact: false })
    const urlElement = screen.queryByText('www.mikehunt.com')
    const likesElement = screen.queryByText(69420)

    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })

  test('checks that a blog renders title, author, URL and likes after clicking view details button', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} allUsers={allUsers} loggedInUser={loggedInUser}/>)

    const button = screen.getByText('View Details')
    await user.click(button)

    screen.getByText('mike hunt')
    screen.getByText('the truth about hunt', { exact: false })
    screen.getByText('www.mikehunt.com', { exact: false })
    screen.getByText(69420, { exact: false })
  })
})

test('check that event handler is called twice when like button is clicked twice', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} allUsers={allUsers} loggedInUser={loggedInUser} increaseLikes={mockHandler} />)

  const detailsButton = screen.getByText('View Details')
  await user.click(detailsButton)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})