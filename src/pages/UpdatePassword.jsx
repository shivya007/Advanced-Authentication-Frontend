import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion as Motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Loader } from 'lucide-react';
import Input from '../components/Input';
import { resetPassword } from '../services/userService';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const resetToken = location.state?.resetToken || null;

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!resetToken){
        toast.error("Your password reset session has expired. Please try again.");
        navigate("/login");
        return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({ newPassword: newPassword, token: resetToken });
      toast.success(response?.message || "Password updated successfully.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Failed to update password.");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Update Password</h2>

        <form onSubmit={handleSubmit} className='space-y-5'>

          <div className="relative w-full">
          <Input
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
            <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className='size-5 text-base-content/40'/>
                ) : (
                  <Eye className='size-5 text-base-content/40'/>
                )}
           </button>
          </div>

          <div className='relative w-full'>
          <Input
            icon={Lock}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
            <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff className='size-5 text-base-content/40'/>
                ) : (
                  <Eye className='size-5 text-base-content/40'/>
                )}
           </button>
          </div>

            <PasswordStrengthMeter password={newPassword}/>

          <Motion.button
            type="submit"
            disabled={isLoading}
            className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg transition duration-200 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Update Password"}
          </Motion.button>

        </form>
      </div>
    </Motion.div>
  );
}

export default UpdatePassword;
