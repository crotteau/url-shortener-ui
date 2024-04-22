import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = () => {
    getUrls()
    .then(data => setUrls(data.urls))
  }

  const updateUrls = (newUrl) => {
    setUrls([...urls, newUrl])
  }
  console.log('urls', urls)

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm updateUrls={updateUrls}/>
      </header>
      <UrlContainer urls={urls}/>
    </main>
  );
}

export default App;

// {
//   "urls": [
//       {
//           "id": 1,
//           "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
//           "short_url": "http://localhost:3001/useshorturl/1",
//           "title": "Awesome photo"
//       }
//   ]
// }