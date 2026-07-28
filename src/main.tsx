const stored = localStorage.getItem('theme');
if (stored === 'light') {
  document.documentElement.classList.add('light');
} else {
  document.documentElement.classList.remove('light');
  if (!stored) localStorage.setItem('theme', 'dark');
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
