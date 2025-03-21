import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DoctorSignUp() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [file, setFile] = useState();
  const [input, setInput] = useState({
    name: "",
    specialty: "",
    experience: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFile(files[0]);
    } else {
      setInput({ ...input, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("experience", input.experience);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("specialty", input.specialty);
    if (file) {
      formData.append("profilePhoto", file);
    }
    formData.append("profilePhoto", input.profilePhoto);

    (async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/post/doctor`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          localStorage.setItem("DoctorId", response.data.userId);
          navigate("/doctor/home");
        }
      } catch (error) {
        if (error.status === 409) {
          <div
            alert
            class="relative w-full p-4 mb-4 text-white border border-orange-100 border-solid rounded-lg bg-gradient-to-tl from-red-500 to-yellow-400"
          >
            {error.response.data.msg}
          </div>;
        }
      }
    })();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <div
        alert
        className="sticky mt-2 w-full p-4 mb-4 text-white border border-orange-100 border-solid rounded-lg bg-gradient-to-tl from-red-500 to-yellow-400"
      >
        Alert orange
      </div> */}

      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Doctor Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="profilePhoto"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Photo
            </label>
            <input
              name="profilePhoto"
              type="file"
              id="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={input.name}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700"
            >
              Specialty
            </label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              onChange={handleChange}
              value={input.specialty}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your specialty"
            />
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Year of Experience
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              onChange={handleChange}
              value={input.experience}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Exerience in your Specialty"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={input.email}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={input.phone}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Phone Number"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/doctor/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
