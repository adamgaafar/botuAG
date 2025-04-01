import React from 'react';

function DevOpsGPT() {
  return (
    <div>
      <h1>DevOps GPT</h1>
      <form>
        <label>
          Command:
          <input type="text" placeholder="Enter a natural language command..." />
        </label>
        <button type="submit">Execute</button>
      </form>
    </div>
  );
}

export default DevOpsGPT;
