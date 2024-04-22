import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = () => {
    getUrls()
      .then(data => setUrls(data.urls))
      .catch(error => setError(error.message))
  }

  const updateUrls = (newUrl) => {
    if (!error) {
    setUrls([...urls, newUrl])
    }
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm updateUrls={updateUrls} setError={setError} />
      </header>
      {error ? <p className='error'>{error}</p> : null}
      <UrlContainer urls={urls} />
    </main>
  );
}

export default App;
