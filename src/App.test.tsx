import { RecoilRoot } from 'recoil';
import App from './App';

xtest('renders learn react link', () => {
  <RecoilRoot>
    render(
    <App />
    ); const linkElement = screen.getByText(/Learn by reading/i);
    expect(linkElement).toBeInTheDocument();
  </RecoilRoot>;
});
