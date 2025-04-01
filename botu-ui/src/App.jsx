import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CICD from './components/CICD';
import Monitoring from './components/Monitoring';
import Security from './components/Security';
import CostOptimization from './components/CostOptimization';
import DevOpsGPT from './components/DevOpsGPT';
import Infrastructure from './components/Infrastructure';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/cicd">CI/CD</Link></li>
            <li><Link to="/monitoring">Monitoring</Link></li>
            <li><Link to="/security">Security</Link></li>
            <li><Link to="/cost-optimization">Cost Optimization</Link></li>
            <li><Link to="/devops-gpt">DevOps GPT</Link></li>
            <li><Link to="/infrastructure">Infrastructure</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cicd" element={<CICD />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/security" element={<Security />} />
          <Route path="/cost-optimization" element={<CostOptimization />} />
          <Route path="/devops-gpt" element={<DevOpsGPT />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
