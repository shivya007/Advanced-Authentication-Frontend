import { motion as Motion } from 'framer-motion'
import React, { useReducer, useState } from 'react'
import Input from '../components/Input.jsx'
import {Lock, Mail, User} from 'lucide-react'
import {Link} from 'react-router-dom'
import PasswordStrength from '../components/PasswordStrength.jsx'


const initialState = {
    name: "",
    email: "",
    password: "",
    error: "",
    isLoading: false,
}

function reducerfn(currentState, action){
    switch(action.type){
        case "SET_FIELD" : 
            return {
            ...currentState, [action.field]: action.value
            }

        case "SET_ERROR":
            return {
            ...currentState, error: action.error,
            }

        case "SET_LOADING":
            return {
            ...currentState, isLoading: action.isLoading,
            }   

        case "RESET":
            return initialState;

        default:
            return currentState;

    }
}

function Signup2() {
    console.log("See rerendering...");

    const [currentState, dispatch] = useReducer(reducerfn, initialState);

    const {name, email, password, error, isLoading} = currentState;




    const handleChange = (field) => (e) =>{
        dispatch({type: 'SET_FIELD', field: field, value: e.target.value});
    }


    const handleSignup = (e) =>{
        e.preventDefault();
        dispatch({ type: 'SET_ERROR', error: '' })

    // Simple validations
    if (!name || !email || !password) {
      return dispatch({ type: 'SET_ERROR', error: 'Please fill in all fields.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return dispatch({ type: 'SET_ERROR', error: 'Invalid email address.' })
    }

    if (password.length < 6) {
      return dispatch({ type: 'SET_ERROR', error: 'Password must be at least 6 characters long.' })
    }

    // Proceed with signup (fake loading)
    dispatch({ type: 'SET_LOADING', isLoading: true })

    setTimeout(() => {
      console.log('Signup Data:', { name, email, password })
      dispatch({ type: 'SET_LOADING', isLoading: false })
      // Optionally reset the form
      // dispatch({ type: 'RESET' })
    }, 1500)
    }






  return (
    <Motion.div initial= {{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Create Account
            </h2>
            <form onSubmit={handleSignup}>

                <Input icon={User} type='text' placeholder='Full Name' value={name} onChange={handleChange('name')}  />
                <Input icon={Mail} type='email' placeholder='email address' value={email} onChange={handleChange('email')}  />
                <Input icon={Lock} type='password' placeholder='password' value={password} onChange={handleChange('password')}  />

                <PasswordStrength password={password}/>
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

                <Motion.button 
                disabled={isLoading}
                type="submit" 
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                >
                    {
                    isLoading ? 
                    'Signing up...' : 
                    'Sign up'
                    }
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

export default Signup2;