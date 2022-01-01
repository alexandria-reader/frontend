export default process.env.NODE_ENV === 'development'
  ? (process.env.REACT_APP_DB_HOST || 'http://localhost:3000')
  : 'https://alexandria-reader-staging.herokuapp.com';
