import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import ClosedWon from "./components/ClosedWon";
import ClosedLost from "./components/ClosedLost";
import Layout from "./components/Layout";
import Leads from "./components/Leads";
import NoMatch from "./components/NoMatch";
import './App.css';
import Form from "./components/common/Form";

import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState('jimmy');

  const navigate = useNavigate();
  const authentication = getAuth();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      setIsAuth(true);

      onAuthStateChanged(authentication, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user.email);
          // ...
        } else {
          // User is signed out
          // ...
        }
      })
      navigate('/user/leads')
    }
  }, [isAuth]);

  const handleAction = (id) => {

    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
          setIsAuth(true);
          navigate('/user/leads')

        })
        .catch((error) => {
          console.log(error);
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('Please check the Email');
          }
          if(error.code === 'auth/invalid-email'){
            toast.error('Invalid Email');
          }
        })
    }

    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(response => {
          navigate('/user/leads')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)        
        })
        .catch((error) => {
          console.log(error);
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('Please check the Email');
          }
          if(error.code === 'auth/invalid-email'){
            toast.error('Invalid Email');
          }
        })
    }
  }

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Form title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1) }/>} />
        <Route path='/register' element={<Form title="Register" setEmail={setEmail} setPassword={setPassword} handleAction={() =>  handleAction(2) }/>} />

        {/* <Route index element={<Login />} exact /> */}
          <Route path="/user" element={<Layout user={user} />}>
            <Route path="/user/leads" element={<Leads user={user}/>} />
            <Route path="/user/closed-won" element={<ClosedWon user={user}/>} />
            <Route path="/user/closed-lost" element={<ClosedLost user={user}/>} />

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            <Route path="*" element={<NoMatch />} />
            {/* there is an outlet on layout */}
          </Route>
      </Routes>
    </div>
  );
}

export default App;
