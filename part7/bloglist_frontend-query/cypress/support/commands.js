Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password
  }).then(response =>
    window.localStorage.setItem('loggedInUser', JSON.stringify(response.body))
  )
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem('loggedInUser')).token
      }`
    }
  })
  cy.visit('http://localhost:3000')
})
