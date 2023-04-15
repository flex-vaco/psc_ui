import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"

import EmpList from "./pages/EmpList"
import EmpCreate from "./pages/EmpCreate"
import EmpEdit from "./pages/EmpEdit"
import EmpShow from "./pages/EmpShow"

import ProjectList from "./pages/ProjectList"
import ProjectCreate from "./pages/ProjectCreate"
import ProjectEdit from "./pages/ProjectEdit"
import ProjectShow from "./pages/ProjectShow"

import EmpProjAlocCreate from "./pages/EmpProjAlocCreate";
import EmpProjAlocList from "./pages/EmpProjAlocList";
import EmpProjAlocEdit from "./pages/EmpProjAlocEdit";

import EmpFilteredList from './pages/EmpFilteredList'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<Login/>} />
          <Route path="/employees"  element={<EmpList/>} />
          <Route path="/empCreate"  element={<EmpCreate/>} />
          <Route path="/empEdit/:id"  element={<EmpEdit/>} />
          <Route path="/empShow/:id"  element={<EmpShow/>} />
          <Route path="/filter/:searchSkill?"  element={<EmpFilteredList/>} />
          <Route path="/home"  element={<Home/>} />
          <Route path="/create"  element={<EmpCreate/>} />
          <Route path="/edit/:id"  element={<EmpEdit/>} />
          <Route path="/show/:id"  element={<EmpShow/>} />
          <Route path="/projects"  element={<ProjectList/>} />
          <Route path="/projectCreate"  element={<ProjectCreate/>} />
          <Route path="/projectEdit/:id"  element={<ProjectEdit/>} />
          <Route path="/projectShow/:id"  element={<ProjectShow/>} />
          <Route path="/empProjCreate"  element={<EmpProjAlocCreate/>} />
          <Route path="/empProjList"  element={<EmpProjAlocList/>} />
          <Route path="/empProjEdit/:id"  element={<EmpProjAlocEdit/>} />
      </Routes>
    </Router>
  );
}

export default App;
