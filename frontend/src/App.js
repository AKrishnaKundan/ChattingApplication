import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import Messages from './components/Messages';

import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/login" element={< Login/>} index/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/messages" element={<Messages/>}/>
      </Routes>
    </div>
  );
}

export default App;
