import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import React from 'react';
import Detail from "./components/Detail";
import DogCreate from "./components/DogCreate"

function App() {
  return (
       
    <div className="App">
      <Routes>
        <Route path = "/*" element = {<LandingPage/>}/>
        <Route path = "/Home" element = {<Home/>}/>
        <Route path= '/home/:id' element = {<Detail/>}/>
        <Route path= '/dogCreate' element = {<DogCreate/>}/>
      </Routes>
    </div>
  );
}

export default App;
