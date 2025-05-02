import { motion as Motion } from 'framer-motion'
import React, { useState } from 'react'
import Input from '../components/Input.jsx'
import {Lock, Mail, User} from 'lucide-react'
import {Link, useNavigate} from 'react-router-dom'
import PasswordStrength from '../components/PasswordStrength.jsx'
import { signupUser } from '../services/userService.js'
import { toast } from 'react-toastify';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const navigate = useNavigate();

    
    const handleSignup = async(e) =>{
        e.preventDefault();

        setError("");

        // Basic validations
    if (!name || !email || !password) {
        setError('All fields are required.');
        toast.error('All fields are required.');
        return;
      }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        toast.error('Please enter a valid email address.');
        return;
      }

      setisLoading(true);

      try {
        const data = {
            name,
            email,
            password
        }
        const response = await signupUser(data);
        toast.success(response.message || "User signed up successfully");
        navigate("/");        
      } catch (error) {
        setError( error.data.message || 'Signup failed');
        toast.error(error.data.message || 'Internal server error');
      }
      finally{
        setisLoading(false);
      }

    }
  return (
    <Motion.div initial= {{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Create Account
            </h2>

            <form onSubmit={handleSignup}>

                <Input icon={User} type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)}  />
                <Input icon={Mail} type='email' placeholder='email address' value={email} onChange={(e) => setEmail(e.target.value)}  />
                <Input icon={Lock} type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}  />

                <PasswordStrength password={password}/>

                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

                <Motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover: from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
                whileHover={{scale: 1.02}} 
                whileTap={{scale: 0.98}} 
                type='submit'>
                {isLoading ? 'Signing up...' : 'Sign up'}
                </Motion.button>
            </form>
        </div>

        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>Already have an account ? {" "}
                <Link to={"/login"} className='text-green-400 hover:underline'>Login</Link>
            </p>
        </div>

    </Motion.div>
  )
}

export default Signup