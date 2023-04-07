// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
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
