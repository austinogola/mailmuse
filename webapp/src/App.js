import Home from './pages/home';
import Policy from './pages/policy';
import ToS from './pages/tos';
import Join from './pages/join';
// import Login from './components/app/Login';
// import Signup from './components/app/Signup';
// import EmailLogin from './components/app/EmailLogin';
// import Pricing from './components/app/Pricing';
// import Dashboard from './components/app/Dashboard';
// import Billing from './components/app/Billing';
// import GoOAuth from './components/app/GoOAuth';
// import GmailPerm from './components/app/GmailPerm';
import { Routes, Route } from 'react-router-dom';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>

      {/* web paths */}
      <Route path="/policy" element={<Policy />}/>
      <Route path="/terms" element={<ToS />}/>
      <Route path="/join" element={<Join />}/>
     

      {/* <Route path="app" element={<Dashboard />}/>
      <Route path="app/dashboard" element={<Dashboard />}/>
      <Route path="app/billing" element={<Billing />}/>
      <Route path="app/billing/plans" element={<Pricing />}/> */}

      {/* app login paths */}
      {/* <Route path="app/login" element={<Login />}/>
      <Route path="app/login/email" element={<EmailLogin />}/>                                                                                                   />}/>
      <Route path="app/login/oauth/google" element={<GoOAuth />}/> */}

      {/* app signup paths */}
      {/* <Route path="/app/signup" element={<Signup/>} />  */}

      {/* Other app paths */}
      
      {/* <Route path="/app/permissions/gmail" element={<GmailPerm/>} />  */}
      
    </Routes>

    
  );
}

export default App;
