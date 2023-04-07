import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EmpList from "./pages/EmpList"
import EmpCreate from "./pages/EmpCreate"
import EmpEdit from "./pages/EmpEdit"
import EmpShow from "./pages/EmpShow"
 
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<EmpList/>} />
          <Route path="/create"  element={<EmpCreate/>} />
          <Route path="/edit/:id"  element={<EmpEdit/>} />
          <Route path="/show/:id"  element={<EmpShow/>} />
      </Routes>
    </Router>
  );
}

export default App;
