import React, { useEffect, useRef, useState } from 'react'
import { motion as Motion } from "motion/react";
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../services/userService';
import { toast } from "react-toastify";

function OTPVerification() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || null;

    useEffect(() =>{
       

        if(code.every(digit => digit !== "")){
            handleSubmit(new Event('submit'));
        }

    }, [code]);

    

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const verificationCode = code.join("");

        setError("");

        if (!email) {
            navigate("/login");
            return null;
          }


        if(code.some((digit) => !digit)){
            setError("Please enter the complete code.");
            toast.error("Please enter the complete code.");
            return;
        }
        setIsLoading(true);

        try {
            const data = {
                email,
                otp: verificationCode,
            }
            const response = await verifyOtp(data);
            await new Promise(resolve => setTimeout(resolve, 300));
            toast.success(response.message || "Email verified successfully!");

            navigate("/");
            
        } catch (error) {
            const msg = error?.data?.message || "OTP verification failed.";
            toast.error(msg);
            setError(msg);
            
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

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <Motion.div 
        initial={{opacity: 0, y: -50}} 
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
        >
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
            verify your email
            </h2>
            <p className='text-center text-gray-300 mb-6'> Enter the 6-digit code sent to your email address </p>

            {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

            <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='flex justify-between'>
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

                <Motion.button whileHover={{scale: 1.05}}
                 whileTap={{scale:0.95}}
                 type='submit'
                 disabled={isLoading || code.some((digit) => !digit)}
                 className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 cursor-pointer'
                 >
                    {isLoading ? "Verifying..." : "Verify email"}

                 </Motion.button>


            </form>



        </Motion.div>
    </div>
  )
}

export default OTPVerification