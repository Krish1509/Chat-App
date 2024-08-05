import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import About from "./pages/about/about"
function App() {
  const { authUser } = useAuthContext();
  return (
    <div className=' h flex flex-col justify-center '>
      <Routes>
          <Route path='/' element={authUser ? <Home />: <Navigate to={'/login'}/>} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> :<Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
          <Route path="/about" element={<About />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
