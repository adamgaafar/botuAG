import React, { useState } from 'react';
import { executeDevOpsGPT } from '../api';

function DevOpsGPT() {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');
    try {
      const result = await executeDevOpsGPT(command);
      setResponse(result.data || 'No response generated.');
    } catch (error) {
      alert(`Error executing command: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h1>DevOps GPT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Command:
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter a natural language command..."
          />
        </label>
        <button type="submit">Execute</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default DevOpsGPT;
