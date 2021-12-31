export default process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.DB_HOST;
