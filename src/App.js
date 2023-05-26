import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import HomePage from './components/HomePage';
import AdminBoard from './components/AdminBoard';
import Community from './components/Community';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/admin" exact element={<AdminBoard />}></Route>
        <Route path="/community" exact element={<Community />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
