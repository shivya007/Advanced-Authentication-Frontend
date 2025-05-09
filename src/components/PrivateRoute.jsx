import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/userService';
import { UserContextInfo } from '../context/UserContext';
import { Loader } from 'lucide-react';
import { toast } from "react-toastify";

function PrivateRoute({children}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {setUser} = useContext(UserContextInfo); // Importing the UserContextInfo to set the user in the context


/* 
Promise Chaining Approach 
    const checkProfile = () =>{
        const responsefrombackend = getProfile();
        responsefrombackend.then((res) =>{
            console.log( res.data.user);
            setLoading(false);
            return res;
        })
        .catch((error) =>{
            console.log("Error in PrivateRoute error: ", error?.response?.data?.message || error.message);
            navigate("/login");
            setLoading(false);
        }
        )
    }
 */


    // Async/Await Approach
    const checkProfile = async() =>{
        try{
        const responsefrombackend = await getProfile();
        console.log("SEE SEE: ", responsefrombackend.data.user);
            setUser(responsefrombackend.data.user); // Setting the user in the context
            setLoading(false);
            return responsefrombackend;
        }
        catch(error){
            toast.error(error?.response?.data?.message || error.message || "login/signup user first");
            setUser(null); // Setting the user to null in the context
            navigate("/login");
            setLoading(false);
        }
    }

useEffect(() =>{
    checkProfile();
}, []);








    if(loading){
        return (
            <div><Loader className="size-6 animate-spin mx-auto"/></div>
        )
    }
  return (
    children
  )
}

export default PrivateRoute