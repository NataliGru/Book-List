import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Dashboard } from './pages/Dashboard';
import { BookManagement } from './pages/BookManagement';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="/addNewBook" element={<BookManagement />} />
      </Route>
    </Routes>
  </HashRouter>
);
