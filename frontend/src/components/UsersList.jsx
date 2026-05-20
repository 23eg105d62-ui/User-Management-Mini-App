import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const API_BASE_URL = "https://user-management-mini-app.onrender.com/user-api";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        setError(null);
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/users`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setUsers(res.data.payload || []);
        } else {
          throw new Error("Invalid response status from server.");
        }
      } catch (err) {
        console.error("Failed to load users", err);
        setError(err.response?.data?.message || err.message || "Failed to load directory database.");
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  // Navigate to single user detail view
  const gotoUser = (userObj) => {
    navigate("/user", { state: { user: userObj } });
  };

  // Helper to generate initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-10">
      {/* Directory Page Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cream">
          User Directory
        </h1>
        <p className="text-peach/75 text-sm sm:text-base">
          Browse and manage all registered profiles currently provisioned in the directory.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-mauve/20 space-y-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-xl bg-plum/40"></div>
                <div className="h-4 w-12 bg-plum/30 rounded"></div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-5 bg-plum/40 rounded w-3/4"></div>
                <div className="h-4 bg-plum/30 rounded w-5/6"></div>
              </div>
              <div className="h-3 bg-plum/20 rounded w-1/2 pt-1"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="glass-panel p-8 rounded-3xl border border-mauve/20 text-center max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-mauve/20 text-peach">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-cream">Database Sync Failed</h3>
          <p className="text-peach/70 text-sm leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-plum hover:bg-plum/80 text-cream font-semibold rounded-xl text-sm transition-all duration-200 cursor-pointer"
          >
            Retry Sync
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && users.length === 0 && (
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-mauve/20 text-center max-w-lg mx-auto space-y-6">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-plum/25 text-peach">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-cream">No Profiles Registered</h3>
            <p className="text-peach/70 text-sm max-w-sm mx-auto">
              There are currently no active profiles provisioned in the directory. Create a new user to populate the database.
            </p>
          </div>
          <button
            onClick={() => navigate("/add-user")}
            className="px-6 py-3 bg-gradient-to-r from-plum to-mauve hover:from-plum/95 hover:to-mauve/95 text-cream font-bold rounded-xl text-base shadow-lg shadow-plum/20 transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            Provision First Profile
          </button>
        </div>
      )}

      {/* Directory Grid */}
      {!loading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((userObj) => (
            <div
              key={userObj.email}
              onClick={() => gotoUser(userObj)}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-mauve/20 cursor-pointer flex flex-col justify-between h-48 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle top decoration glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-plum via-mauve to-peach opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="space-y-4">
                {/* Card Header: Initials Badge */}
                <div className="flex justify-between items-start">
                  <div className="h-11 w-11 rounded-xl bg-plum/40 border border-mauve/30 text-peach flex items-center justify-center font-bold text-base shadow-inner">
                    {getInitials(userObj.name)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-peach/10 text-peach border border-peach/15">
                    Profile
                  </span>
                </div>

                {/* Card Body: Info */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-cream truncate group-hover:text-peach transition-colors duration-200">
                    {userObj.name}
                  </h3>
                  <p className="text-peach/70 text-sm truncate font-sans">
                    {userObj.email}
                  </p>
                </div>
              </div>

              {/* Card Footer: View Details Action */}
              <div className="pt-3 border-t border-mauve/10 flex items-center justify-between text-xs text-peach/50 group-hover:text-peach transition-colors duration-200">
                <span className="font-semibold tracking-wide">View Profile</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersList;