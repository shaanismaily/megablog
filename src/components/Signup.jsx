import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Input, Logo, Button } from "./index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "../store/authSlice";

function Signup({ email, password, name }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full">
      <div>
        <span>
          <Logo width="70px" />
        </span>
        <h2>Create Account</h2>
        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </div>
      <form onSubmit={handleSubmit(create)}>
        <Input
          label="Full Name: "
          placeholder="e.g., John Doe"
          {...register("name", {
            required: true,
          })}
        />

        <Input
          type="email"
          label="Email: "
          placeholder="e.g., johndoe@example.com"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <Input 
        type="password"
        label="Password: "
        {...register("password", {
            required: true
        })}
        />

        <Button type="submit" className="w-full">
            Create Account
        </Button>
      </form>
    </div>
  );
}

export default Signup;