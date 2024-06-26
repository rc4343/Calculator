import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Calculator.tsx';
import reportWebVitals from './reportWebVitals';

<head>
<script src="http://localhost:55463"></script>
</head>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();