
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './Routes/Admin';
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Employee from './Routes/Employee';
import Client from './Routes/Client';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Router> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Register />} />
          {/* Admin Routes */}
          <Route path='/admin/*' element={<Admin />} />
           <Route path='/employee/*' element={<Employee/>}/>
           <Route path='/client/*' element={<Client/>}/>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
