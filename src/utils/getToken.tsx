export default function getToken(): string | null {
  return localStorage.getItem('alexandria-user-token');
}
