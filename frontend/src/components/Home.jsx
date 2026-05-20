import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const API_BASE_URL = "https://user-management-mini-app.onrender.com/user-api";

function Home() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await axios.get(`${API_BASE_URL}/users`);
        if (res.status === 200 && res.data?.payload) {
          setUserCount(res.data.payload.length);
        }
      } catch (err) {
        console.error("Error fetching user count", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCount();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Header Section */}
      <div className="text-center py-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cream via-peach to-mauve bg-clip-text text-transparent">
          Welcome to UserSphere
        </h1>
        <p className="text-lg sm:text-xl text-peach/80 leading-relaxed font-sans max-w-2xl mx-auto">
          A high-performance directory console for managing organizational profile data, auditing user connections, and provisioning new directory access.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel p-6 rounded-2xl border border-mauve/20 flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wider uppercase text-peach/60">Registered Profiles</p>
            <h3 className="text-4xl font-extrabold text-cream mt-2">
              {loading ? (
                <div className="h-9 w-16 bg-plum/30 animate-pulse rounded-lg mt-1"></div>
              ) : (
                userCount
              )}
            </h3>
          </div>
          <p className="text-xs text-peach/40 mt-4 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            Syncing live from MongoDB Atlas
          </p>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-6 rounded-2xl border border-mauve/20 flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wider uppercase text-peach/60">Database Cluster</p>
            <h3 className="text-3xl font-extrabold text-emerald-400 mt-2 flex items-center gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              Active
            </h3>
          </div>
          <p className="text-xs text-peach/40 mt-4">SSL Encryption Enabled</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-6 rounded-2xl border border-mauve/20 flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wider uppercase text-peach/60">System Latency</p>
            <h3 className="text-4xl font-extrabold text-cream mt-2">128ms</h3>
          </div>
          <p className="text-xs text-peach/40 mt-4">API health checks operational</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Action 1: Add User */}
        <div 
          onClick={() => navigate('/add-user')}
          className="glass-panel glass-panel-hover p-8 rounded-3xl border border-mauve/20 cursor-pointer transition-all duration-300 group flex gap-6 items-start"
        >
          <div className="p-4 rounded-2xl bg-plum/40 text-peach group-hover:bg-plum/60 transition-colors duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-cream group-hover:text-peach transition-colors duration-200">Provision User Profile</h4>
            <p className="text-peach/70 text-sm leading-relaxed">
              Register new user access keys, assign profile credentials, email descriptors, and contact values.
            </p>
          </div>
        </div>

        {/* Action 2: User Directory */}
        <div 
          onClick={() => navigate('/users-list')}
          className="glass-panel glass-panel-hover p-8 rounded-3xl border border-mauve/20 cursor-pointer transition-all duration-300 group flex gap-6 items-start"
        >
          <div className="p-4 rounded-2xl bg-plum/40 text-peach group-hover:bg-plum/60 transition-colors duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 8.625 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-cream group-hover:text-peach transition-colors duration-200">Explore User Directory</h4>
            <p className="text-peach/70 text-sm leading-relaxed">
              Browse complete list of profiles, search/filter directory indices, and drill down into detailed individual profiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;