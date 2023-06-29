describe('Blog app', function () {
  const blog = {
    title: 'First blog',
    author: 'Joseph Blogs',
    url: 'www.myfirsturl.com'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Michael OBrien',
      username: 'micko',
      password: 'hello'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Log in to see blogs')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('micko')
      cy.get('#password').type('hello')
      cy.contains('Login').click()

      cy.contains('You are currently logged in as micko.')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('micko')
      cy.get('#password').type('wrong')
      cy.contains('Login').click()

      cy.get('.error')
        .should('contain', 'Login credentials are incorrect')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'micko', password: 'hello' })
      cy.visit('http://localhost:3000')
    })

    it('a blog can be created', function () {
      cy.contains('Add a blog').click()
      cy.get('#title').type('My test blog')
      cy.get('#author').type('Joe Blogs')
      cy.get('#url').type('www.mytestblog.com')
      cy.contains('Create').click()

      cy.contains('New blog added successfully').and(
        'have.css',
        'color',
        'rgb(0, 128, 0)'
      )
      cy.contains('My test blog')
    })

    describe('once a blog is created', function () {
      beforeEach(function () {
        cy.createBlog(blog)
      })
      it('it can be liked multiple times', function () {
        cy.contains('View Details').click()
        cy.get('.blog').contains('Like').click()
        cy.contains('Like added.')
        cy.contains('Likes - 1')
        cy.get('.blog').contains('Like').click()
        cy.contains('Likes - 2')
      })

      it('it can be deleted by the user who created it', function () {
        cy.contains('View Details').click()
        cy.get('.blog').contains('Delete').click()

        cy.get('.notification').should('contain', 'Blog deleted.')
        cy.get('html').should('not.contain', 'First blog')
      })

      it('only the user who created the blog can see the delete button', function () {
        const user = {
          name: 'Honja Blade',
          username: 'honja',
          password: 'hello'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.contains('Logout').click()
        cy.login({ username: 'honja', password: 'hello' })
        cy.visit('http://localhost:3000')
        cy.contains('View Details').click()

        cy.get('.blog')
          .contains('Added by: Michael OBrien')
          .and('not.contain', 'Delete')
      })

      it('blogs are sorted by amount of likes and in descending order', function () {
        cy.createBlog({
          title: 'Second blog',
          author: 'Jimmy Blogstovic',
          url: 'www.mysecondurl.com'
        })
        cy.contains('Date Added').click()
        cy.contains('Number of Likes')
        cy.contains('.blog', 'Second blog').contains('View Details').click()
        cy.contains('.blog', 'Second blog').contains('Like').click()
        cy.get('.blog').eq(0).should('contain', 'Second blog')
        cy.get('.blog').eq(1).should('contain', 'First blog')

        cy.contains('.blog', 'First blog').contains('View Details').click()
        cy.contains('.blog', 'First blog').contains('Like').click()
        cy.contains('.blog', 'First blog').contains('Likes - 1')
        cy.contains('.blog', 'First blog').contains('Like').click()
        cy.contains('.blog', 'First blog').contains('Likes - 2')
        cy.get('.blog').eq(0).should('contain', 'First blog')
        cy.get('.blog').eq(1).should('contain', 'Second blog')
      })
    })
  })
})
