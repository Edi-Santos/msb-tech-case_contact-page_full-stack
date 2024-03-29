import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';

function App() {
  return (
    <Routes>
      <Route path="/home" element={ <Home /> } />
      <Route path="/" element={ <Navigate replace to="/home" /> } />
    </Routes>
  );
}

export default App;
