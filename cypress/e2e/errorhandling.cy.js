describe('failed network requests and incomplete forms', () => {
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

  it('should display an error if network request fails', () => {
    
  })
})