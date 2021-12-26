export default function getToken() {
  const token = localStorage.getItem('user');
  let tokenObj;
  if (token) {
    tokenObj = JSON.parse(token);
  }
  return tokenObj;
}
