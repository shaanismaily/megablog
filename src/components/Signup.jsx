import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Input, Logo, Button } from "./index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "../store/authSlice";

function Signup() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">

        <div className="flex justify-center mb-4">
          <Logo width="120px" />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800">
          Create your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-blue-600 font-medium hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        {/* Form INSIDE card */}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">

          <Input
            label="Full Name"
            placeholder="John Doe"
            {...register("name", { required: true })}
          />

          <Input
            type="email"
            label="Email"
            placeholder="johndoe@example.com"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email address",
              },
            })}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;