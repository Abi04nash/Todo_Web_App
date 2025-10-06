import React from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/store'; 

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(clearUser());
                
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='w-full lg:w-full border-1 border-cyan-600 rounded-md'>
            <div className='w-full p-2 flex items-center justify-between'>
                <h1 className='font-bold text-lg'>{user?.fullName || "Guest"}</h1>
                {user && <Button onClick={logoutHandler}>Logout</Button>}
            </div>
        </div>
    );
};

export default Navbar;