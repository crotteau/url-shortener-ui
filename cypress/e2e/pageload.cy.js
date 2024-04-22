describe('main page load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urlMockData.json'
    }).as('getUrls')
    cy.visit('http://localhost:3000/')
    cy.wait('@getUrls')
  })

  it('should load all elements and existing data', () => {
    cy.get('header').get('h1').contains('URL Shortener')
      .get('form').get(`input[name='title']`)
      .get('form').get(`input[name='URL-to-Shorten']`)
      .get('button').contains('Shorten Please!')
      .get('.url-container').children().should('have.length', 3)
      .get('.url-container').children().first().get('h3').contains('Awesome photo')
      .get('.url-container').children().first().get('a').contains('http://localhost:3001/useshorturl/1')
      .get('.url-container').children().first().get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      .get('.url-container').children().last().get('h3').contains('Turing Cover Letter')
      .get('.url-container').children().last().get('a').contains('http://localhost:3001/useshorturl/3')
      .get('.url-container').children().last().get('p').contains('https://careerdev.turing.edu/resources/cover_letter_resources')
  })
})