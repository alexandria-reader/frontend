import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  <RecoilRoot>
    render(<App />);
    const linkElement = screen.getByText(/Learn by reading/i);
    expect(linkElement).toBeInTheDocument();
  </RecoilRoot>;
});
