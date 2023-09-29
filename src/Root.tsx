import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Dashboard } from './pages/Dashboard';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<Dashboard />} />
    </Routes>
  </HashRouter>
);
