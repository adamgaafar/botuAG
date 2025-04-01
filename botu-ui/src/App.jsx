import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'; // Import Link
import './styles.css'; // Ensure global styles are imported
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className={isAuthenticated ? 'authenticated-layout' : ''}>
        {isAuthenticated && (
          <nav>
            <div className="hamburger" onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className={`nav-menu ${isMenuOpen ? 'mobile show' : ''}`}>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/infrastructure" onClick={() => setIsMenuOpen(false)}>Infrastructure</Link></li>
              <li><Link to="/cicd" onClick={() => setIsMenuOpen(false)}>CI/CD</Link></li>
              <li><Link to="/monitoring" onClick={() => setIsMenuOpen(false)}>Monitoring</Link></li>
              <li><Link to="/security" onClick={() => setIsMenuOpen(false)}>Security</Link></li>
              <li><Link to="/cost-optimization" onClick={() => setIsMenuOpen(false)}>Cost Optimization</Link></li>
              <li><Link to="/devops-gpt" onClick={() => setIsMenuOpen(false)}>DevOps GPT</Link></li>
              <li>
                <a href="#" onClick={() => { 
                  localStorage.removeItem('token'); 
                  window.location.reload(); 
                  setIsMenuOpen(false); 
                }}>Logout</a>
              </li>
            </ul>
          </nav>
        )}
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/cicd" element={<CICD />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/security" element={<Security />} />
              <Route path="/cost-optimization" element={<CostOptimization />} />
              <Route path="/devops-gpt" element={<DevOpsGPT />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
        <footer>
          <p>
            © 2025 BOTU Platform | <a href="/docs">Documentation</a> | <a href="/support">Support</a> | <a href="https://twitter.com">Twitter</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
