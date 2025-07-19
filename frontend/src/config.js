// API Configuration for production and development
const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://barzha.pythonanywhere.com'
    : 'http://localhost:8000',
};

export default config;