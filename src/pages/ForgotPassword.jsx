import React, { useRef, useState } from 'react'
import { motion as Motion } from "motion/react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, verifyOTPPassword } from '../services/userService';
import { Loader, Mail } from 'lucide-react';
import Input from '../components/Input';

function ForgotPassword() {
    const [email, setEmail] = useState("");  
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
      e.preventDefault();
      const verificationCode = code.join("");
      setError("");

      if(code.some((digit) => !digit)){
        setError("Please enter the complete code.");
        toast.error("Please enter the complete code.");
        return;
      }

      if(!email) {
            const msg = 'Please enter your email address.';
            setError(msg);
            toast.error(msg);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email address.');
          toast.error('Please enter a valid email address.');
          return;
        }


      setIsLoading(true);

      try {
        const data = {
            email,
            otp: verificationCode,
        }
        const response = await verifyOTPPassword(data);
        toast.success(response?.message || "OTP verified successfully. You can now update your password.");
        navigate("/update-password", {
          state: {
            resetToken: response?.resetToken
          }
        });
      } catch (error) {
        const msg = error?.message || "Failed to verify OTP. Try again.";
        setError(msg);
        toast.error(msg);
      }
      finally{
        setIsLoading(false);
    }
    }


    const handleChange =(index, value) =>{
      if (!/^\d*$/.test(value)) return; // Ignore non-digit input
      setCode((prev) =>{
          const newCode = [...prev];
          newCode[index] = value;
          return newCode;
          });
  
      if(value && index < 5){
          inputRefs.current[index + 1].focus();
      }
  }

  const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").trim();

      if (!/^\d+$/.test(pastedData)) return; // If not numeric, ignore

      const pastedCode = pastedData.slice(0, 6).split("");

      setCode((prev) =>{
          const newCode = [...prev];
          for(let i = 0; i < 6; i++){
              newCode[i] = pastedCode[i] || "";
          }
          return newCode;
      });

      const lastIndexFilled = pastedCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastIndexFilled < 5 ? lastIndexFilled + 1 : 5;
      inputRefs.current[focusIndex].focus(); 
  };

  const handleKeyDown = (index, e) =>{

      if(e.key === "Backspace" && !code[index] && index > 0){
          setCode((prev) =>{
              const newCode = [...prev];
              newCode[index-1] = "";
              return newCode;
          });
          inputRefs.current[index-1]?.focus();
      }

      if (e.key === "ArrowRight" && index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
    
      if (e.key === "ArrowLeft" && index > 0) {
          inputRefs.current[index - 1]?.focus();
      }
  }


    const handleOTP = async (e) =>{
        e.preventDefault();
        setError("");

        if(!email) {
            const msg = 'Please enter your email address.';
            setError(msg);
            toast.error(msg);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email address.');
          toast.error('Please enter a valid email address.');
          return;
        }
        setIsLoading(true);

        try {
            const data = {
                email,
            }
            const response = await forgotPassword(data);
            toast.success(response?.message || "OTP is sent to your email. Please check your inbox.");
        }catch (error) {
          const msg = error?.message || "Failed to send reset link. Try again.";
          setError(msg);
          toast.error(msg);
        }
        finally{
            setIsLoading(false);
        }
    }
    
  return (
    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <Input icon={Mail} type='email' placeholder='email address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleOTP} type='button' className=" cursor-pointer absolute right-8 top-40 transform -translate-y-1/2 text-sm px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded shadow hover:from-green-600 hover:to-emerald-700">send otp</button>

          <div className='flex justify-between mt-12'>
            {
            code.map((digit, index) =>(
            <input 
            aria-label={`Digit ${index + 1}`}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            key={index} 
            ref={(el) => (inputRefs.current[index] = el)} 
            maxLength='1' 
            value={digit} 
            onChange={(e) => handleChange(index, e.target.value)} 
            onPaste={(e) => handlePaste(e)} 
            onKeyDown={(e) => handleKeyDown(index, e)} 
            className='size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-800 rounded-lg focus:border-green-500 focus:outline-none' />
            ))
            }
          </div>

          {error && (
            <p className="text-red-400 mt-2 text-sm text-center">{error}</p>
          )}

          <Motion.button 
          className={`mt-5 w-full py-3 px-4 rounded-lg font-bold shadow-lg transition duration-200 ${
            isLoading || code.some((digit) => !digit)
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
          }`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type='submit' 
          disabled={isLoading || code.some((digit) => !digit)}>
            {isLoading ?
              (<Loader className="size-6 animate-spin mx-auto" />) :
              ("change Password")
            }
          </Motion.button>
        </form>
      </div>

      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Remembered your password?{" "}
          <Link to={"/login"} className='text-green-400 hover:underline'>Login</Link>
        </p>
      </div>

    </Motion.div>
  )
}

export default ForgotPassword