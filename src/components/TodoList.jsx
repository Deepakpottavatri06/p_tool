// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../api/todo';
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Textarea
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoList = ({ setIsAuthenticated }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
        setToken(token);
    }, [navigate, setIsAuthenticated]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const result = await getTodos(token);
                setTodos(result.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
        if (token) fetchTodos();
    }, [token]);

    const handleCreateTodo = async () => {
        try {
            // Trigger notification
            await axios.post("https://p-tool-backend.vercel.app/api/subid/trigger", { email: sessionStorage.getItem("email") });
            const result = await createTodo(newTodo, token);
            setTodos([...todos, result.data]);
            setNewTodo({ title: '', description: '' });
            handleOpen();  // Close the dialog after adding todo
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleUpdateTodo = async (id, updatedTodo) => {
        try {
            const result = await updateTodo(id, updatedTodo, token);
            setTodos(todos.map(todo => todo._id === id ? result.data : todo));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id, token);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className='text-4xl font-bold mb-10'>To-Do List</h1>
            <Button onClick={handleOpen} variant='gradient'>Add Todo</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Add Todo
                        </Typography>

                        <Typography className="-mb-2" variant="h6">
                            Task Name
                        </Typography>
                        <Input label="Task" size="lg" value={newTodo.title} onChange={e => setNewTodo({ ...newTodo, title: e.target.value })} />
                        <Typography className="-mb-2" variant="h6">
                            Description
                        </Typography>
                        <Textarea label="description" value={newTodo.description} onChange={e => setNewTodo({ ...newTodo, description: e.target.value })} />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleCreateTodo} fullWidth>
                            Add
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>

            <ul className='flex gap-2 flex-wrap justify-center items-center'>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <Card className="mt-6 w-96 p-0 z-0">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {todo.title}
                                    <Checkbox checked={todo.completed} onChange={() => handleUpdateTodo(todo._id, { ...todo, completed: !todo.completed })} />
                                </Typography>
                                <Typography>
                                    {todo.description}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button variant='gradient' onClick={() => handleDeleteTodo(todo._id)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
