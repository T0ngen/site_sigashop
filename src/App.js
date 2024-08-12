import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from "./firstPage/FirstPage";
import AboutUsPage from "./AboutUsPage/AboutUsPage";
import DeliveryPage from "./DeliveryPage/DeliveryPage";
function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
      </Routes>
    
  </Router>
  );
};

export default App;