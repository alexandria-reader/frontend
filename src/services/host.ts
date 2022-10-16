export default process.env.NODE_ENV === 'development' ||
process.env.CONTEXT === 'deploy-preview'
  ? process.env.REACT_APP_DEV_DB
  : process.env.REACT_APP_PROD_DB;
