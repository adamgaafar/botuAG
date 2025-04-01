import React from 'react';

function Infrastructure() {
  return (
    <div>
      <h1>Infrastructure Management</h1>
      <form>
        <label>
          Deployment Requirements:
          <textarea placeholder="Enter requirements..." />
        </label>
        <button type="submit">Generate IaC</button>
      </form>
    </div>
  );
}

export default Infrastructure;
