import React, { useState } from 'react';
import api from '../api';

function Infrastructure() {
  const [requirements, setRequirements] = useState('');
  const [file, setFile] = useState(null);
  const [repoLink, setRepoLink] = useState('');
  const [cloudProvider, setCloudProvider] = useState('aws');
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('requirements', requirements);
    formData.append('file', file);
    formData.append('repoLink', repoLink);
    formData.append('cloudProvider', cloudProvider);

    try {
      const response = await api.post('/cloud/deploy', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Deployment failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Infrastructure Deployment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Deployment Requirements:
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Enter requirements..."
          />
        </label>
        <label>
          Upload ZIP File:
          <input type="file" accept=".zip" onChange={handleFileChange} />
        </label>
        <label>
          Repository Link:
          <input
            type="text"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            placeholder="Enter repository link..."
          />
        </label>
        <label>
          Select Cloud Provider:
          <select
            value={cloudProvider}
            onChange={(e) => setCloudProvider(e.target.value)}
          >
            <option value="aws">AWS</option>
            <option value="azure">Azure</option>
            <option value="gcp">GCP</option>
            <option value="all">All</option>
          </select>
        </label>
        <button type="submit">Deploy</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Infrastructure;
