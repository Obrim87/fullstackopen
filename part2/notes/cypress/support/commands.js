Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(response => {
    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
  })
  // this is defined in cypress.config.js
  cy.visit('')
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/notes',
    body: { content, important },
    headers: {
      'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('loggedInUser')).token}`
    }
  })
  // this is defined in cypress.config.js
  cy.visit('')
})