import React from 'react';
import './App.css';
import Header from './components/header';
import Reverser from './components/reverser';
import Summation from './components/summation';


function App() {
  return (
    <div className="app">
      <Header/>
      <Reverser/>
      <Summation/> 
    </div>
  );
}

export default App;
