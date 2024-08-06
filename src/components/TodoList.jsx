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
}
    from "@material-tailwind/react";
import Unknown from './Unknown';
import { useNavigate } from 'react-router-dom';

const TodoList = ({ setIsAuthenticated}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(!token){
            navigate('/login');
        }
        setIsAuthenticated(true);
        console.log(token);
        setToken(token);
    }, []);

    useEffect(() => {
        const fetchTodos = async () => {
            const result = await getTodos(token);
            setTodos(result.data);
        };
        fetchTodos();
    }, [token]);

    const handleCreateTodo = async () => {
        const result = await createTodo(newTodo, token);
        setTodos([...todos, result.data]);
        setNewTodo({ title: '', description: '' });
    };

    const handleUpdateTodo = async (id, updatedTodo) => {
        const result = await updateTodo(id, updatedTodo, token);
        setTodos(todos.map(todo => todo._id === id ? result.data : todo));
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id, token);
        setTodos(todos.filter(todo => todo._id !== id));
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
                        <Textarea label="description" value={newTodo.description}
                            onChange={e => setNewTodo({ ...newTodo, description: e.target.value })} />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={() => { handleOpen(); handleCreateTodo(); }} fullWidth>
                            Add
                        </Button>

                    </CardFooter>
                </Card>
            </Dialog>

            <ul className='flex gap-2 flex-wrap justify-center items-center'>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <Card className="mt-6 w-96 p-0">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {todo.title}
                                    <Checkbox onChange={() => handleUpdateTodo(todo._id, { ...todo, completed: !todo.completed })}/>
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
