describe('filling out and submitting form', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urlMockData.json'
    }).as('getUrls')
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        "long_url": "https://apod.nasa.gov/apod/astropix.html",
        "title": "Astronomy Picture of the Day",
        "id": 5,
        "short_url": "http://localhost:3001/useshorturl/5"
      }
    }).as('postUrl')
    cy.visit('http://localhost:3000/')
    cy.wait('@getUrls')
  })

  it('should update input field values as the user types in the form', () => {
    cy.get('form').get(`input[name='title']`).type('Astronomy Picture of the Day').should('have.value', 'Astronomy Picture of the Day')
      .get('form').get(`input[name='URL-to-Shorten']`).type('https://apod.nasa.gov/apod/astropix.html').should('have.value', 'https://apod.nasa.gov/apod/astropix.html')
  }),

    it('should display new shortened URL when user fills out and submits the form', () => {
      cy.get('form').get(`input[name='title']`).type('Astronomy Picture of the Day').should('have.value', 'Astronomy Picture of the Day')
        .get('form').get(`input[name='URL-to-Shorten']`).type('https://apod.nasa.gov/apod/astropix.html').should('have.value', 'https://apod.nasa.gov/apod/astropix.html')
        .get('button').click()
        .get('.url-container').children().should('have.length', 4)
        .get('.url-container').children().first().get('h3').contains('Awesome photo')
        .get('.url-container').children().first().get('a').contains('http://localhost:3001/useshorturl/1')
        .get('.url-container').children().first().get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
        .get('.url-container').children().last().get('h3').contains('Astronomy Picture of the Day')
        .get('.url-container').children().last().get('a').contains('http://localhost:3001/useshorturl/5')
        .get('.url-container').children().last().get('p').contains('https://apod.nasa.gov/apod/astropix.html')
    })
})
