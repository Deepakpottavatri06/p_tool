import React, { useState } from "react";
import { Card, Input, Button, Typography , Alert } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";


export default function Login({ logset }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  async function LoginValidation(e) {
    e.preventDefault();
    setLoading(true); // Show the loader

    try {
      const response = await axios.post(
        `https://p-tool-backend.vercel.app/api/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("email", email);
      logset(true);
      navigate("/todos");
    } catch (err) {
      console.error(err);
      setError("Invalid Email or Password");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader />} 
      <Card color="transparent" shadow={false} className="flex items-center my-20 ">
        <Typography variant="h4" color="white">
          Log In
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={LoginValidation}
          >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" className="-mb-3 text-gray-100">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-gray-500 focus:!border-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              color="white"
              onChange={(e) => setEmail(e.target.value)}
              />
            <Typography variant="h6" className="-mb-3 text-gray-100">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-gray-500 focus:!border-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              color="white"
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          
          {error && <Alert className="mt-2">{error}</Alert>}
          <Button className="mt-6 hover:bg-gray-600" fullWidth type="submit">
            Log In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-gray-400">
              Sign up
            </Link>
          </Typography>
        </form>
      </Card>
    </>
  );
}
