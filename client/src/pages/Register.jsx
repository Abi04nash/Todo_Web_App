import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const registerHandler = async () => {
    if(!user.fullName || !user.email || !user.password){
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("https://todo-web-app-x5um.onrender.com/api/v1/user/register", user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if(res.data.success){
        toast.success(res.data.message);
        navigate("/login"); // redirect to login after registration
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="border-2 border-cyan-600 p-10 rounded-lg shadow-lg w-[85%] md:w-1/4 max-w-md text-white">
        <h2 className="text-2xl font-bold mb-10 text-center">Register</h2>

        <Input 
          className="mb-4" 
          type="text" 
          placeholder="Full Name" 
          name="fullName" 
          value={user.fullName} 
          onChange={changeHandler} 
        />
        <Input 
          className="mb-4" 
          type="email" 
          placeholder="Email" 
          name="email" 
          value={user.email} 
          onChange={changeHandler} 
        autoComplete="off" 
        />
        <Input 
          className="mb-6" 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={user.password} 
          onChange={changeHandler} 
        autoComplete="new-password" 
        />

        <Button className="w-full" onClick={registerHandler}>Register</Button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  )
}

export default Register
