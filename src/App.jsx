import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom"
import FloatingShapes from "./components/FloatingShapes"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import OTPVerification from "./pages/OTPVerification"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import NotFound from './components/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShapes backgroundColor='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
      <FloatingShapes backgroundColor='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5}/>
      <FloatingShapes backgroundColor='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/> 

      <Routes>
        <Route path="/" element=
        {
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-otp" element={<OTPVerification/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/update-password' element ={<UpdatePassword/>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />


    </div>
  )
}

export default App
