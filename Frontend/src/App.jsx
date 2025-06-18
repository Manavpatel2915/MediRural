import React from 'react';
import AllMedicines from './components/AllMedicines.jsx';
import './App.css';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllMedicines />
    </div>
  );
}

export default App;
