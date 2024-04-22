describe('failed network requests and incomplete forms', () => {

  it('should display an error if GET request fails', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
    }).as('getUrls')
    cy.visit('http://localhost:3000/')
      .get('.error').contains('Failed to fetch!')
  })

  it('should prevent user from submitting empty form values', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urlMockData.json'
    }).as('getUrls')
    cy.visit('http://localhost:3000/')
    cy.wait('@getUrls')
    cy.get('form').get(`input[name='title']`).type('Astronomy Picture of the Day').should('have.value', 'Astronomy Picture of the Day')
    .get('button').click()
    .get('.alert').contains('Please complete form!')
  })
})