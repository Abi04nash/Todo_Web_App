import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
    try {
        const {fullName , email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        // finding user ki phele se tho register nahi hain
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"This email id is already registered"
            })
        }

        // new user create kardo
        const hashedPassword = await bcrypt.hash(password , 10);

        await User.create({
            fullName,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            success:true,
            message:"Account cerated successfully"
        })
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password , user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }

        
        const token = await jwt.sign({userId:user._id} , process.env.SECRET_KEY,{expiresIn:'1d'});

        return res.status(200)
        .cookie("token" , token , {
            httpOnly:true,
            sameSite:"strict",
            maxAge:24*60*60*1000
        })
        .json({
            success:true,
            message:`Welcome back ${user.fullName}`,
            user: { 
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        }
        })


    } catch (error) {
        console.log(error);
    }
}


export const logout = (_ , res) => {
    try {
        return res.status(200).cookie("token" , "" , {maxAge:0}).json({
            success:true,
            message:"User logout successfully"
        })
    } catch (error) {
        console.log(error);
    }
}