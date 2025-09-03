import React, { useContext, useState } from "react";
import AuthLayouts from "../../components/layouts/AuthLayouts";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // Login API call here
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayouts>
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg mx-auto mt-10 md:mt-0">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
          <p className="text-sm text-gray-500 mt-2">
            Please enter your details to log in.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default Login;
