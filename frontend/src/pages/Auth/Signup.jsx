import React, { useContext, useState } from "react";
import AuthLayouts from "../../components/layouts/AuthLayouts";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullname) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    // API call can go here
    try {
      //Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname,
        email,
        password,
        profileImageUrl,
      });
      console.log("Signup response:", response.data);

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Signup error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayouts>
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg mx-auto mt-10 md:mt-0">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Create an Account
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Join us today by entering your details below.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="flex justify-center">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              value={fullname}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
          </div>

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
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default Signup;
