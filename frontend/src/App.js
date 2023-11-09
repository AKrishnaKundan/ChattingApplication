import {Routes, Route} from 'react-router';

import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={< Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </div>
  );
}

export default App;
