function getUrls() {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Failed to fetch!')
      }
      return resp
    })
    .then(resp => resp.json())

}

function postUrls(url) {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(url)
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Failed to post!')
      }
      return resp
    })
    .then(resp => resp.json()
    )
}

export {
  getUrls,
  postUrls
}