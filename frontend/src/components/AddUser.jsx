import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";

const API_BASE_URL = "https://user-management-mini-app.onrender.com/user-api";

function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Form submit handler
  const onUserCreate = async (newUser) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/users`,
        newUser,
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        navigate("/users-list");
      } else {
        throw new Error("Failed to create profile. Unexpected server response.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-mauve/25 shadow-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cream">Add New Profile</h1>
          <p className="text-peach/70 text-sm">Provision a new user account into the directory database</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-mauve/20 border border-mauve/40 text-cream p-4 rounded-xl text-sm flex items-start gap-3">
            <svg className="w-5 h-5 text-peach shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <div className="flex-1">
              <span className="font-bold">Error:</span> {error}
            </div>
            <button onClick={() => setError(null)} className="text-peach hover:text-cream cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Add User Form */}
        <form onSubmit={handleSubmit(onUserCreate)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-peach/85 block">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-peach/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <input
                type="text"
                disabled={loading}
                {...register("name", { required: "Name is required" })}
                className={`w-full pl-10 pr-4 py-3 bg-obsidian/40 border rounded-xl text-cream placeholder-peach/30 focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-transparent transition-all text-base ${
                  errors.name ? "border-mauve" : "border-mauve/25"
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-xs text-peach font-semibold mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-peach/85 block">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-peach/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <input
                type="email"
                disabled={loading}
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={`w-full pl-10 pr-4 py-3 bg-obsidian/40 border rounded-xl text-cream placeholder-peach/30 focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-transparent transition-all text-base ${
                  errors.email ? "border-mauve" : "border-mauve/25"
                }`}
                placeholder="johndoe@example.com"
              />
            </div>
            {errors.email && <p className="text-xs text-peach font-semibold mt-1">{errors.email.message}</p>}
          </div>

          {/* Date of Birth Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-peach/85 block">Date of Birth</label>
            <div className="relative font-sans">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-peach/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </span>
              <input
                type="date"
                disabled={loading}
                {...register("dateOfBirth", { required: "Date of birth is required" })}
                className={`w-full pl-10 pr-4 py-3 bg-obsidian/40 border rounded-xl text-cream placeholder-peach/30 focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-transparent transition-all text-base ${
                  errors.dateOfBirth ? "border-mauve" : "border-mauve/25"
                }`}
              />
            </div>
            {errors.dateOfBirth && <p className="text-xs text-peach font-semibold mt-1">{errors.dateOfBirth.message}</p>}
          </div>

          {/* Mobile Number Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-peach/85 block">Mobile Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-peach/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </span>
              <input
                type="tel"
                disabled={loading}
                {...register("mobileNumber", { 
                  required: "Mobile number is required",
                  minLength: { value: 10, message: "Must be at least 10 digits" }
                })}
                className={`w-full pl-10 pr-4 py-3 bg-obsidian/40 border rounded-xl text-cream placeholder-peach/30 focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-transparent transition-all text-base ${
                  errors.mobileNumber ? "border-mauve" : "border-mauve/25"
                }`}
                placeholder="9876543210"
              />
            </div>
            {errors.mobileNumber && <p className="text-xs text-peach font-semibold mt-1">{errors.mobileNumber.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-plum to-mauve hover:from-plum/80 hover:to-mauve/80 text-cream font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-plum/20"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cream" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Provisioning Profile...
              </>
            ) : (
              "Add Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;