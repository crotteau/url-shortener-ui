import React, { useState } from 'react';
import { postUrls } from '../../apiCalls';

function UrlForm({ updateUrls, setError }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  const [alert, setAlert] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    addNewUrl()
    clearInputs();
  }

  const addNewUrl = () => {
    const addUrl = {
      long_url: urlToShorten,
      title: title
    }
    checkCompletion(addUrl)
  }

  const checkCompletion = (addUrl) => {
    if (title && urlToShorten) {
      postUrls(addUrl)
        .then(resp => updateUrls(resp))
        .catch(error => setError(error.message))
      setAlert('')
    } else {
      setAlert('Please complete form!')
    }
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <React.Fragment>
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='URL-to-Shorten'
          value={urlToShorten}
          onChange={e => setUrlToShorten(e.target.value)}
        />

        <button onClick={e => handleSubmit(e)}>
          Shorten Please!
        </button>
        {alert ? <p className='alert'>{alert}</p> : null}
      </form>
    </React.Fragment>
  )
}

export default UrlForm;
