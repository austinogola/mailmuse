
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Billing from './components/Billing';
import Login from './components/Login';
import Signup from './components/Signup';
import GoOAuth from './components/GoOAuth';
import EmailLogin from './components/EmailLogin';
import Plans from './components/Plans';
import EmailRegister from './components/EmailRegister';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Home />}/>
        <Route path="/billing" element={<Billing />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Signup />}/>
        <Route path="/oauth-google" element={<GoOAuth />}/>
        <Route path="/email-login" element={<EmailLogin />}/>
        <Route path="/plans" element={<Plans />}/>
        <Route path="/register-email" element={<EmailRegister />}/>
    </Routes>
  );
}

export default App;
