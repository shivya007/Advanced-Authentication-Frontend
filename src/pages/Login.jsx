import React, { useState } from "react";
import { motion as Motion } from "motion/react";
import { Loader, Lock, Mail } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import { toast } from 'react-toastify';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();




  const handleLogin = async(e) =>{
    e.preventDefault();

    setError("");


    if(!email || !password) {
      const msg = 'Please enter both email and password.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        email,
        password,
      }
      const response = await loginUser(data);
      toast.success(response.message);

      navigate("/verify-otp", {
        state: {
          email: email
        }
      });
    } catch (error) {
      const msg = error?.data?.message || "Login failed. Try again.";
      setError(msg);
      toast.error(msg);
    }
    finally{
      setIsLoading(false);
    }


  }
  return (
    <Motion.div initial= {{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Welcome Back</h2>

        <form onSubmit={handleLogin}>
        <Input icon={Mail} type='email' placeholder='email address' value={email} onChange={(e) => setEmail(e.target.value)}  />
        <Input icon={Lock} type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}  />

        {error && (
            <p className="text-red-400 mt-2 text-sm text-center">{error}</p>
          )
        }

        <Motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover: from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 cursor-pointer'  whileHover={{scale: 1.02}} whileTap={{scale: 0.98}} type='submit' disabled={isLoading}>
          {isLoading ?
          ( <Loader className="size-6 animate-spin mx-auto"/>) :
          (
            "login"
          )
        }
        </Motion.button>
        </form>
      </div>

      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>Don't have an account ? {" "}
                <Link to={"/signup"} className='text-green-400 hover:underline'>signup</Link>
            </p>
        </div>

    </Motion.div>
  );
}

export default Login
