import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
});

export const fetchInfrastructure = (data) => api.post('/infrastructure', data);
export const fetchCICD = (data) => api.post('/cicd', data);
export const fetchMonitoring = () => api.get('/monitoring');
export const fetchSecurity = () => api.get('/security');
export const fetchCostOptimization = () => api.get('/cost-optimization');
export const executeDevOpsGPT = (command) => api.post('/devops-gpt', { command });

export const generateIaCTemplate = (requirements) =>
  api.post('/ai/generate-iac', { requirements });

export const generatePipelineConfig = (repositoryUrl) =>
  api.post('/ai/generate-pipeline', { repositoryUrl });

export default api;
