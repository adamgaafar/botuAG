import React, { useState } from 'react';
import api from '../api';

function Infrastructure() {
  const [activeTab, setActiveTab] = useState('github'); // 'github' or 'zip'
  const [repoLink, setRepoLink] = useState('');
  const [file, setFile] = useState(null);
  const [cloudProvider, setCloudProvider] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRepoLinkChange = (e) => {
    setRepoLink(e.target.value);
  };

  const handleCloudProviderChange = (e) => {
    const selectedProvider = e.target.value;
    setCloudProvider(selectedProvider);

    // Check for missing credentials
    if (['gcp', 'aws', 'azure'].includes(selectedProvider)) {
      setErrorMessage(`Missing credentials for ${selectedProvider.toUpperCase()}`);
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (activeTab === 'github' && repoLink) {
      formData.append('repoLink', repoLink);
    } else if (activeTab === 'zip' && file) {
      formData.append('file', file);
    } else {
      setResponseMessage('Please provide the required input.');
      return;
    }
    formData.append('cloudProvider', cloudProvider);

    setIsLoading(true);
    try {
      const response = await api.post('/cloud/deploy', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'Deployment failed. Please try again.');
    } finally {
      setIsLoading(false);
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
          Deploy GitHub Repo that static
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
            onChange={handleCloudProviderChange}
          >
            <option value="aws">AWS</option>
            <option value="azure">Azure</option>
            <option value="gcp">GCP</option>
            <option value="all">All</option>
          </select>
        </label>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Deploying...' : 'Deploy'}
        </button>
      </form>
      {isLoading && <p>Cloning repository, please wait...</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Infrastructure;
