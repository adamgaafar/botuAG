import React, { useState } from 'react';
import api from '../api';

function Infrastructure() {
  const [activeTab, setActiveTab] = useState('github'); // 'github' or 'zip'
  const [repoLink, setRepoLink] = useState('');
  const [file, setFile] = useState(null);
  const [cloudProvider, setCloudProvider] = useState('aws');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [deployments, setDeployments] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRepoLinkChange = (e) => {
    setRepoLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    const formData = new FormData();
    if (activeTab === 'github' && repoLink) {
      formData.append('repoLink', repoLink);
    } else if (activeTab === 'zip' && file) {
      formData.append('file', file);
    } else {
      setResponseMessage('Please provide the required input.');
      setLoading(false);
      return;
    }
    formData.append('cloudProvider', cloudProvider);

    try {
      const response = await api.post('/cloud/deploy', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Deployment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeployments = async () => {
    try {
      const response = await api.get('/cloud/deployments');
      setDeployments(response.data);
    } catch (error) {
      console.error('Failed to fetch deployments:', error);
    }
  };

  return (
    <div>
      <h1>Infrastructure Deployment</h1>
      <div className="tabs">
        <button
          className={activeTab === 'github' ? 'active' : ''}
          onClick={() => setActiveTab('github')}
        >
          Deploy GitHub Repo
        </button>
        <button
          className={activeTab === 'zip' ? 'active' : ''}
          onClick={() => setActiveTab('zip')}
        >
          Deploy ZIP File
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {activeTab === 'github' && (
          <div>
            <label>
              Repository Link:
              <input
                type="text"
                value={repoLink}
                onChange={handleRepoLinkChange}
                placeholder="Enter repository link..."
                required
              />
            </label>
          </div>
        )}
        {activeTab === 'zip' && (
          <div>
            <label>
              Upload ZIP File:
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                required
              />
            </label>
          </div>
        )}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Deploying...' : 'Deploy'}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      <div>
        <h2>Deployment Status</h2>
        <button onClick={fetchDeployments}>Refresh Deployments</button>
        <ul>
          {deployments.map((deployment) => (
            <li key={deployment.id}>
              <strong>{deployment.name}</strong>: {deployment.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Infrastructure;
