export default {
  API_ENDPOINT: 'http://localhost:8000',
  TOKEN_KEY: 'fuudi-client-auth-token',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '20s',
}
