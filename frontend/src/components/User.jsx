import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const API_BASE_URL = "https://user-management-mini-app.onrender.com/user-api";

function User() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const user = state?.user;

  // Function to request user deletion
  const handleDelete = async () => {
    if (!user?._id) return;
    
    const confirmDelete = window.confirm(`Are you sure you want to remove ${user.name} from the directory?`);
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      setDeleteError(null);
      const res = await axios.delete(`${API_BASE_URL}/users/${user._id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/users-list");
      } else {
        throw new Error("Unable to delete user profile.");
      }
    } catch (err) {
      console.error(err);
      setDeleteError(err.response?.data?.message || err.message || "Failed to remove profile.");
    } finally {
      setDeleting(false);
    }
  };

  // Safe navigation fallback if state is empty
  if (!user) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-mauve/20 text-center max-w-xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-cream">No Profile Loaded</h3>
        <p className="text-peach/70 text-sm leading-relaxed">
          Please select a profile from the user directory to view its configuration parameters.
        </p>
        <button 
          onClick={() => navigate("/users-list")}
          className="px-5 py-2.5 bg-plum hover:bg-plum/80 text-cream font-semibold rounded-xl text-sm transition-all duration-200 cursor-pointer"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Details Container */}
      <div className="glass-panel rounded-3xl border border-mauve/25 shadow-2xl overflow-hidden">
        {/* Banner Decorative Header */}
        <div className="h-32 bg-gradient-to-r from-plum via-mauve to-peach relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
          {/* Back button on top of banner */}
          <button
            onClick={() => navigate("/users-list")}
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-obsidian/40 border border-cream/10 text-cream hover:bg-obsidian/70 transition-all text-xs font-semibold backdrop-blur cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Directory
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-8 pt-0 relative space-y-6">
          {/* Avatar Ring overlapping the banner */}
          <div className="flex flex-col items-center -mt-14 relative z-10 space-y-2">
            <div className="h-24 w-24 rounded-2xl bg-obsidian/90 border-4 border-obsidian text-peach flex items-center justify-center font-extrabold text-3xl shadow-xl shadow-obsidian/50 select-none">
              {getInitials(user.name)}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-cream font-sans">{user.name}</h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-peach/10 text-peach border border-peach/15 mt-1 inline-block">
                Directory Profile
              </span>
            </div>
          </div>

          {/* Delete Error Banner */}
          {deleteError && (
            <div className="bg-mauve/20 border border-mauve/40 text-cream p-4 rounded-xl text-sm flex items-start gap-3">
              <svg className="w-5 h-5 text-peach shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <div className="flex-1">
                <span className="font-bold">Error:</span> {deleteError}
              </div>
              <button onClick={() => setDeleteError(null)} className="text-peach hover:text-cream cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* User Fields Grid */}
          <div className="border-t border-mauve/10 pt-6 space-y-4 font-sans">
            {/* Field: Full Name */}
            <div className="flex items-center gap-4 py-1.5 px-3 rounded-xl hover:bg-plum/10 transition-colors">
              <div className="text-peach/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-[10px] uppercase font-bold tracking-wider text-peach/40">Full Name</p>
                <p className="text-cream text-base font-semibold">{user.name}</p>
              </div>
            </div>

            {/* Field: Email */}
            <div className="flex items-center gap-4 py-1.5 px-3 rounded-xl hover:bg-plum/10 transition-colors">
              <div className="text-peach/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-[10px] uppercase font-bold tracking-wider text-peach/40">Email Address</p>
                <p className="text-cream text-base font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Field: Date of Birth */}
            <div className="flex items-center gap-4 py-1.5 px-3 rounded-xl hover:bg-plum/10 transition-colors">
              <div className="text-peach/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-[10px] uppercase font-bold tracking-wider text-peach/40">Date of Birth</p>
                <p className="text-cream text-base font-semibold">{user.dateOfBirth}</p>
              </div>
            </div>

            {/* Field: Mobile Number */}
            <div className="flex items-center gap-4 py-1.5 px-3 rounded-xl hover:bg-plum/10 transition-colors">
              <div className="text-peach/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-[10px] uppercase font-bold tracking-wider text-peach/40">Mobile Number</p>
                <p className="text-cream text-base font-semibold">{user.mobileNumber}</p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="border-t border-mauve/10 pt-6 flex justify-end gap-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 py-2.5 bg-mauve/20 hover:bg-mauve/30 text-peach hover:text-cream border border-mauve/30 hover:border-mauve/50 font-bold rounded-xl text-sm transition-all duration-200 transform active:scale-98 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {deleting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-cream" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.78 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Remove Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;