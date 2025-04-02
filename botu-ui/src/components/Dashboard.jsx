import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../api';

function Dashboard() {
  const [deployments, setDeployments] = useState([
    { id: '1', name: 'Deployment 1', status: 'success', timestamp: '2025-04-01 10:00:00' },
    { id: '2', name: 'Deployment 2', status: 'in_progress', timestamp: '2025-04-01 11:00:00' },
    { id: '3', name: 'Deployment 3', status: 'failed', timestamp: '2025-04-01 12:00:00' },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.on('deploymentUpdate', (update) => {
      setDeployments((prev) =>
        prev.map((d) => (d.id === update.id ? { ...d, status: update.status } : d)),
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="dashboard-container">
      <header>
        <h1>BOTU Platform Dashboard</h1>
        <h2>Version 1.0</h2>
        <p className="tagline">AI-Driven, Multi-Cloud, and Fully Integrated</p>
      </header>

      <section>
        <h3>Introduction</h3>
        <p>
          The Ultimate DevOps Automation Platform redefines DevOps practices by integrating artificial intelligence (AI), automation, and multi-cloud orchestration. It eliminates manual tasks, reduces human error, and ensures seamless management of infrastructure, CI/CD pipelines, security, compliance, and cost optimization.
        </p>
        <ul>
          <li><strong>Unified Platform:</strong> Consolidates infrastructure provisioning, CI/CD, monitoring, security, and cost management into a single interface.</li>
          <li><strong>AI-First Approach:</strong> Proactive anomaly detection, auto-remediation, and code generation.</li>
          <li><strong>Multi-Cloud & Hybrid Support:</strong> Seamless integration with AWS, GCP, Azure, and on-premise environments.</li>
          <li><strong>Zero-Touch Automation:</strong> Reduces scripting with low-code/no-code workflows and natural language commands.</li>
        </ul>
      </section>

      <section>
        <h3>Core Features</h3>
        <div className="features-grid">
          <div>
            <h4>Infrastructure Management & Provisioning</h4>
            <ul>
              <li>AI-generated Terraform/Ansible/Kubernetes IaC templates</li>
              <li>One-click multi-cloud setup</li>
              <li>Self-healing infrastructure</li>
              <li>Cost-aware auto-scaling</li>
            </ul>
          </div>
          <div>
            <h4>CI/CD Automation</h4>
            <ul>
              <li>AI-generated pipelines</li>
              <li>Predictive failure prevention</li>
              <li>GitOps-native deployments</li>
              <li>Dynamic canary/blue-green deployments</li>
            </ul>
          </div>
          <div>
            <h4>Monitoring & Observability</h4>
            <ul>
              <li>Unified dashboard for logs, metrics, and traces</li>
              <li>AI-driven anomaly detection</li>
              <li>Auto-remediation playbooks</li>
            </ul>
          </div>
          <div>
            <h4>Security & Compliance</h4>
            <ul>
              <li>Continuous security scanning</li>
              <li>Automated threat blocking</li>
              <li>Policy enforcement for compliance</li>
            </ul>
          </div>
          <div>
            <h4>Cost Optimization & FinOps</h4>
            <ul>
              <li>Real-time cost dashboards</li>
              <li>AI-driven rightsizing</li>
              <li>Auto-cleanup for unused resources</li>
            </ul>
          </div>
          <div>
            <h4>AI-Powered DevOps Assistant (DevOps GPT)</h4>
            <ul>
              <li>Natural language infrastructure deployment</li>
              <li>Context-aware troubleshooting</li>
              <li>AI-generated documentation</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3>Key Highlights</h3>
        <ul className="highlights">
          <li> End-to-end automation with AI</li>
          <li> Zero-touch deployments & self-healing</li>
          <li> Unified security, cost, and compliance</li>
          <li> Natural language DevOps (ChatOps)</li>
          <li> Multi-cloud/hybrid simplicity</li>
        </ul>
      </section>

      <section>
        <h3>Deployment Statuses</h3>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {deployments.map((deployment) => (
              <li key={deployment.id}>
                <strong>{deployment.name}</strong>: {deployment.status} (Last updated: {deployment.timestamp})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
