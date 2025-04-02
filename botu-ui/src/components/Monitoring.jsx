import React, { useState } from 'react';
import { AreaChart, Area, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Monitoring() {
  const [performanceData] = useState([
    { time: '10:00', cpu: 30, memory: 50, network: 20 },
    { time: '10:05', cpu: 40, memory: 60, network: 25 },
    { time: '10:10', cpu: 35, memory: 55, network: 30 },
  ]);
  const [logs] = useState([
    { id: '1', timestamp: '2025-04-01 10:00:00', message: 'Service started', level: 'info' },
    { id: '2', timestamp: '2025-04-01 10:05:00', message: 'High memory usage detected', level: 'warning' },
  ]);
  const [alerts] = useState([
    { id: '1', message: 'CPU usage exceeded 80%', severity: 'critical' },
    { id: '2', message: 'Disk space running low', severity: 'warning' },
  ]);

  return (
    <div className="dashboard-container">
      <h1>Monitoring & Observability</h1>
      <div>
        <h2>System Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <Area type="monotone" dataKey="cpu" stackId="1" stroke="#f44336" fill="#f44336" />
            <Area type="monotone" dataKey="memory" stackId="1" stroke="#2196f3" fill="#2196f3" />
            <Area type="monotone" dataKey="network" stackId="1" stroke="#4caf50" fill="#4caf50" />
            <Tooltip />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>Logs</h2>
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.timestamp}</strong>: {log.message} ({log.level})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Alerts</h2>
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id} style={{ color: alert.severity === 'critical' ? 'red' : 'orange' }}>
              {alert.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Monitoring;
