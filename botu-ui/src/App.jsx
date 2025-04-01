import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Infrastructure from './components/Infrastructure';
import CICD from './components/CICD';
import Monitoring from './components/Monitoring';
import Security from './components/Security';
import CostOptimization from './components/CostOptimization';
import DevOpsGPT from './components/DevOpsGPT';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <>
            <nav>
              <ul>
                <li><a href="/">Dashboard</a></li>
                <li><a href="/infrastructure">Infrastructure</a></li>
                <li><a href="/cicd">CI/CD</a></li>
                <li><a href="/monitoring">Monitoring</a></li>
                <li><a href="/security">Security</a></li>
                <li><a href="/cost-optimization">Cost Optimization</a></li>
                <li><a href="/devops-gpt">DevOps GPT</a></li>
                <li><a href="#" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Logout</a></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/cicd" element={<CICD />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/security" element={<Security />} />
              <Route path="/cost-optimization" element={<CostOptimization />} />
              <Route path="/devops-gpt" element={<DevOpsGPT />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
