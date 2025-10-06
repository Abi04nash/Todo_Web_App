import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'react-hot-toast';
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X , Edit2 , Check } from 'lucide-react';

const Home = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null);
     const [editingValues, setEditingValues] = useState({});



    const addTodoHandler = async () => {
        try {
            const res = await axios.post("https://todo-web-app-x5um.onrender.com/api/v1/todo", { title, description }, {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true,

            })
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                setTodos([...todos, res.data.todo]);
                setTitle("");
                setDescription("");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }



    // Start editing a todo
    const startEditing = (todo) => {
        setEditingTodoId(todo._id);
        setEditingValues({
            ...editingValues,
            [todo._id]: { title: todo.title, description: todo.description }
        });
    };

    // Handle input change for editing
    const handleChange = (todoId, field, value) => {
        setEditingValues({
            ...editingValues,
            [todoId]: {
                ...editingValues[todoId],
                [field]: value
            }
        });
    };

    // Update todo
    const updateTodoHandler = async (id) => {
        try {
            const { title, description } = editingValues[id];
            const res = await axios.put(
                `https://todo-web-app-x5um.onrender.com/api/v1/todo/${id}`,
                { title, description },
                { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setTodos(todos.map(todo => todo._id === id ? res.data.todo : todo));
                setEditingTodoId(null);
                const copy = { ...editingValues };
                delete copy[id];
                setEditingValues(copy);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };










    const deleteTodoHandler = async (id) => {
        try {
            const res = await axios.delete(`https://todo-web-app-x5um.onrender.com/api/v1/todo/${id}`, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setTodos(todos.filter(todo => todo._id !== id));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await axios.get("https://todo-web-app-x5um.onrender.com/api/v1/todo", {
                    withCredentials: true,
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    },
                });

                if (res.data.success) {
                    setTodos(res.data.todos);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchTodo();
    }, []);




    return (
        <div className="w-full flex flex-col justify-center items-left">

            <Navbar />

            <div className='flex items-center gap-5 mt-10'>
                <Input value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Add a new Todo...."
                    className="text-white w-[100%] lg:w-1/4" />
                <Button onClick={addTodoHandler}>Add TODO🔥</Button>

            </div>
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a Description"
                className=' text-white w-[100%] lg:w-1/4 mt-3 min-h-40' />



             {/* Todos Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                {todos.map((todo) => (
                    <Card key={todo._id} className="bg-slate-950 w-full p-3 relative">
                        {/* Top section: Title + Buttons */}
                        <div className="flex justify-between items-start">
                            {/* Title */}
                            {editingTodoId === todo._id ? (
                                <input
                                    type="text"
                                    value={editingValues[todo._id]?.title || ""}
                                    onChange={(e) => handleChange(todo._id, "title", e.target.value)}
                                    className="text-blue-400 text-lg font-semibold bg-slate-800 rounded px-1"
                                />
                            ) : (
                                <h2 className="text-blue-400 text-lg font-semibold">{todo.title}</h2>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-2">
                                {editingTodoId === todo._id ? (
                                    <button onClick={() => updateTodoHandler(todo._id)}>
                                        <Check className='rounded-sm bg-slate-800 p-1 text-green-400' size={25} />
                                    </button>
                                ) : (
                                    <button onClick={() => startEditing(todo)}>
                                        <Edit2 className='rounded-sm bg-slate-800 p-1 text-amber-50' size={25} />
                                    </button>
                                )}

                                <button onClick={() => deleteTodoHandler(todo._id)}>
                                    <X className='rounded-sm bg-slate-800 p-1 text-red-500' size={25} />
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-2">
                            {editingTodoId === todo._id ? (
                                <Textarea
                                    value={editingValues[todo._id]?.description || ""}
                                    onChange={(e) => handleChange(todo._id, "description", e.target.value)}
                                    className="text-white bg-slate-800 rounded w-full"
                                />
                            ) : (
                                <p className="text-white text-sm text-left">{todo.description}</p>
                            )}
                        </div>
                    </Card>
                ))}
            </div>


        </div>
    )
}

export default Home
