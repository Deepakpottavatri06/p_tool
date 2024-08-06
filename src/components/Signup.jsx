import {
    Card,
    Input,
    Alert,
    Button,
    Typography,
  } from "@material-tailwind/react";
    import { Link } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function SignupValidation(e) {
      e.preventDefault();
      // console.log(email);
      setLoading(true); // Show the loader
        try {
            const response = await axios.post( `https://p-tool-backend.vercel.app/api/signup` , {
                email: email,
                password: password,
                name: name
            }, { headers: { 'Content-Type': 'application/json' } });
            navigate("/login");
            // console.log(response);
          }
        catch (err) {
            console.log(err);
            if(err.response.data.message === "user already exists"){
              setError("User already exists");
            }
            else{
              setError("Invalid Email or Password");
            }
            setTimeout(() => setError(""), 3000);
          } finally {
            setLoading(false);
          }
        
    }

    return (
      <>
      {loading && <Loader />} 
       <Card color="transparent" shadow={false} className="items-center my-10">
        <Typography variant="h4" color="white">
          Sign Up
        </Typography>
        <Typography  className="mt-1 font-normal text-gray-400">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={SignupValidation}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6"  className="-mb-3 text-gray-100">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Name"
              className=" !border-gray-500 focus:!border-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              color="white"
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="h6"  className="-mb-3 text-gray-100">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-gray-500 focus:!border-gray-200 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
                color="white"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="h6"  className="-mb-3 text-gray-100">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-gray-500 focus:!border-gray-200 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
                color="white"
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <Alert className="mt-2">{error}</Alert>}
           
          <Button className="mt-6 hover:bg-gray-700" fullWidth type="submit">
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
           
            <Link to="/login" className="font-medium text-gray-400">
                Log In
            </Link>
          </Typography>
        </form>
      </Card>
      </>
    );
  }