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

import EmpProjUtiliCreate from "./pages/utilization/EmpProjUtiliCreate";
import EmpProjUtiliList from "./pages/utilization/EmpProjUtiliList";
import EmpProjUtiliEdit from "./pages/utilization/EmpProjUtiliEdit";

import EmpFilteredList from './pages/EmpFilteredList'
import Home from './pages/Home'

import UserCreate from "./pages/UserCreate";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";

import ForecastHours from "./pages/reports/ForecastHours";
import AvailableHours from "./pages/reports/AvailableHours";

import ClientList from "./pages/clients/ClientList"
import ClientCreate from "./pages/clients/ClientCreate"
import ClientEdit from "./pages/clients/ClientEdit"
import ClientShow from "./pages/clients/ClientShow"
import  InteliChat from "./pages/aiChat/InteliChat";

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
          <Route path="/create"   element={<EmpCreate/>} />
          <Route path="/edit/:id"  element={<EmpEdit/>} />
          <Route path="/show/:id"  element={<EmpShow/>} />
          <Route path="/projects"  element={<ProjectList/>} />
          <Route path="/projectCreate"  element={<ProjectCreate/>} />
          <Route path="/projectEdit/:id"  element={<ProjectEdit/>} />
          <Route path="/projectShow/:id"  element={<ProjectShow/>} />
          <Route path="/empProjCreate"  element={<EmpProjAlocCreate/>} />
          <Route path="/empProjList"  element={<EmpProjAlocList/>} />
          <Route path="/empProjEdit/:id"  element={<EmpProjAlocEdit/>} />
          <Route path="/empProjUtiliCreate"  element={<EmpProjUtiliCreate/>} />
          <Route path="/empUtiliList"  element={<EmpProjUtiliList/>} />
          <Route path="/empProjUtiliEdit/:id"  element={<EmpProjUtiliEdit/>} />
          <Route path="/userCreate"  element={<UserCreate/>} />
          <Route path="/userList"  element={<UserList/>} />
          <Route path="/userEdit/:id"  element={<UserEdit/>} />
          <Route path="/forecastHours"  element={<ForecastHours/>} />
          <Route path="/availableHours"  element={<AvailableHours/>} />
          <Route path="/clients"  element={<ClientList/>} />
          <Route path="/clientCreate"  element={<ClientCreate/>} />
          <Route path="/clientEdit/:id"  element={<ClientEdit/>} />
          <Route path="/clientShow/:id"  element={<ClientShow/>} />
          <Route path="/ichat"  element={<InteliChat/>} />
      </Routes>
    </Router>
  );
}

export default App;
