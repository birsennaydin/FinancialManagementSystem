import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinanceResources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/resources')
      .then(res => setResources(res.data))
      .catch(err => console.error('Failed to load resources:', err));
  }, []);

  return (
    <div>
      <h2>Financial Resources</h2>
      <ul>
        {resources.map((item, idx) => (
          <li key={idx}>
            <strong>{item.title}</strong><br />
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceResources;
