import React from 'react';

function CICD() {
  return (
    <div>
      <h1>CI/CD Automation</h1>
      <form>
        <label>
          Repository URL:
          <input type="text" placeholder="Enter repository URL..." />
        </label>
        <button type="submit">Generate Pipeline</button>
      </form>
    </div>
  );
}

export default CICD;
