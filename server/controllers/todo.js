import {Todo} from "../models/todo.js";
import express from "express";

export const createTodo = async (req,res) => {
    try {
        const {title , description} = req.body;
        const userId = req.user._id; 

        if(!title || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const todo = new Todo({title , description , user:userId});
        await todo.save();


        return res.status(201).json({
            success:true,
            message:"todo created successfully",
            todo
        })

    } catch (error) {
        console.log(error);
    }
}


export const getAllTodos = async (req,res) => {
    try {
        const userId = req.user._id; 
        const todos = await Todo.find({ user: userId }); 
        return res.status(200).json({
            success:true,
            // todos:todos.length === 0 ? [] : todos
            todos
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateTodo = async (req,res) => {
    try {
        const todoId = req.params.todoId;
        const {title,description } = req.body;
        // const todo = await Todo.findById(todoId);

        const todo = await Todo.findByIdAndUpdate(todoId , {title,description } , {new:true});
        await todo.save();

        return res.status(200).json({
            success:true,
            todo,
            message:"Todo updated"
        })

    } catch (error) {
        console.log(error);
    }
}



export const deleteTodo = async (req,res) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo.findByIdAndDelete(todoId);

        return res.status(200).json({
            success:true,
            message:"Todo deleted successfully"
        })


    } catch (error) {
        console.log(error);
    }
}

