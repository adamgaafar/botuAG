import React, { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3'];

function CostOptimization() {
  const [costTrends, setCostTrends] = useState([
    { month: 'January', cost: 1200 },
    { month: 'February', cost: 1100 },
    { month: 'March', cost: 950 },
    { month: 'April', cost: 1050 },
  ]);
  const [costBreakdown, setCostBreakdown] = useState([
    { name: 'Compute', value: 500 },
    { name: 'Storage', value: 300 },
    { name: 'Networking', value: 200 },
    { name: 'Others', value: 100 },
  ]);
  const [recommendations, setRecommendations] = useState([
    { id: '1', recommendation: 'Use reserved instances', potentialSavings: '$200/month' },
    { id: '2', recommendation: 'Optimize storage usage', potentialSavings: '$50/month' },
  ]);
  const [filter, setFilter] = useState('all');

  return (
    <div className="dashboard-container">
      <h1>Cost Optimization</h1>
      <div>
        <h2>Cost Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={costTrends}>
            <Line type="monotone" dataKey="cost" stroke="#4caf50" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>Cost Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={costBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {costBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>Filters</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
        </select>
      </div>
      <div>
        <h2>Cost-Saving Recommendations</h2>
        <table>
          <thead>
            <tr>
              <th>Recommendation</th>
              <th>Potential Savings</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.recommendation}</td>
                <td>{rec.potentialSavings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CostOptimization;
