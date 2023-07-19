import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('NewBlogForm', () => {
  test.only('check that event handler receives correct data when form is submitted', async () => {
    const user = userEvent.setup()
    const mockCreateBlog = jest.fn()
    const mockSetIsVisible = jest.fn()

    render(<NewBlogForm handleCreate={mockCreateBlog} setIsVisible={mockSetIsVisible}/>)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const submitButton = screen.getByText('Create')

    await user.type(titleInput, 'my title')
    await user.type(authorInput, 'joe blogs')
    await user.type(urlInput, 'www.test.com')
    await user.click(submitButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: 'my title',
      author: 'joe blogs',
      url: 'www.test.com'
    })
  })
})

// tests working, upto Frontend integration tests