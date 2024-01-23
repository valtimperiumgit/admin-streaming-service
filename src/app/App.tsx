import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from '../pages/main/main';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from '../pages/login/Login';
import MainWithAuth from '../hocs/mainWithAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<MainWithAuth />} />
      </Routes>
      <ToastContainer autoClose={2000} position="top-center"/>
    </Router>
  );
}

export default App;
