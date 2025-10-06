import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


import { useDispatch } from 'react-redux';
import { setUser } from '../store/store'; 

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [user, setUserState] = useState({ 
        email: "",
        password: ""
    })

    const changeHandler = (e) => {
        setUserState({ ...user, [e.target.name]: e.target.value });
    }

    const loginHandler = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/login", user, {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true,
            })

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
      
                navigate("/");           //navigate to the home page
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="border-2 border-cyan-600 p-10 rounded-lg shadow-lg w-[85%] md:w-1/4 max-w-md text-white">
                <h2 className="text-2xl font-bold mb-10 text-center">Login</h2>
                <Input
                    className="mb-4"
                    value={user.email}
                    name="email"
                    onChange={changeHandler}
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                />
                <Input
                    className="mb-6"
                    value={user.password}
                    name="password"
                    onChange={changeHandler}
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                />
                <Button
                    className="w-full"
                    onClick={loginHandler}
                >
                    Login
                </Button>
                <p className="mt-4 text-sm text-center text-gray-400">
                    Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Register</span>
                </p>
            </div>
        </div>
    )
}

export default Login;