import React, { useState } from 'react';
import { postUrls } from '../../apiCalls';

function UrlForm({ updateUrls }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

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
    postUrls(addUrl)
      .then(resp => updateUrls(resp))
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
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
        name='URL to Shorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
