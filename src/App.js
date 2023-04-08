import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EmpList from "./pages/EmpList"
import EmpCreate from "./pages/EmpCreate"
import EmpEdit from "./pages/EmpEdit"
import EmpShow from "./pages/EmpShow"
import ProjectList from "./pages/ProjectList"
import ProjectCreate from "./pages/ProjectCreate"

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<EmpList/>} />
          <Route path="/create"  element={<EmpCreate/>} />
          <Route path="/edit/:id"  element={<EmpEdit/>} />
          <Route path="/show/:id"  element={<EmpShow/>} />
          <Route path="/projects"  element={<ProjectList/>} />
          <Route path="/projectCreate"  element={<ProjectCreate/>} />
      </Routes>
    </Router>
  );
}

export default App;
