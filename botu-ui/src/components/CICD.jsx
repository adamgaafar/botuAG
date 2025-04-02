import React, { useState } from 'react';
import { generatePipelineConfig } from '../api';

function CICD() {
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [pipelineConfig, setPipelineConfig] = useState('');

  const handleGeneratePipeline = async (e) => {
    e.preventDefault();
    setPipelineConfig('');
    try {
      const response = await generatePipelineConfig(repositoryUrl);
      setPipelineConfig(response.data.config || 'No configuration generated.');
    } catch (error) {
      alert(`Error generating pipeline: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h1>CI/CD Automation</h1>
      <form onSubmit={handleGeneratePipeline}>
        <label>
          Repository URL:
          <input
            type="text"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            placeholder="Enter repository URL..."
          />
        </label>
        <button type="submit">Generate Pipeline</button>
      </form>
      {pipelineConfig && (
        <div>
          <h2>Generated Pipeline Configuration</h2>
          <pre>{pipelineConfig}</pre>
        </div>
      )}
    </div>
  );
}

export default CICD;
