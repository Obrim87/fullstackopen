describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`) // defined in cypress.config.js
    const user = {
      name: 'Michael OBrien',
      username: 'micko',
      password: 'hello'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) // defined in cypress.config.js
    cy.visit('')
  })

  it('front page can be openend', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('user can log in', function() {
    cy.contains('Log in').click()
    cy.get('#username').type('micko')
    cy.get('#password').type('hello')
    cy.get('#loginButton').click()

    cy.contains('You are currently logged in as micko.')
  })

  it('login fails with wrong password', function() {
    cy.contains('Log in').click()
    cy.get('#username').type('micko')
    cy.get('#password').type('wrong')
    cy.contains('Submit').click()

    cy.get('.error').should('contain', 'Wrong credentials.')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'You are currently logged in as micko.')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'micko', password: 'hello' })
    })

    it('a new note can be created', function() {
      cy.contains('Add a note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('Save note').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({ content: 'a note created by cypress', important: true })
      })

      it('it can be made not important', function() {
        cy.contains('a note created by cypress').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'not important')
      })
    })

    describe('and several notes exists', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'important')
      })
    })
  })
})