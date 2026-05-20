import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="bg-obsidian/90 border-t border-mauve/20 py-10 px-6 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Footer Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-plum to-peach flex items-center justify-center">
            <svg className="w-4 h-4 text-obsidian" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 8.625 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-widest text-cream uppercase">
            UserSphere
          </span>
        </div>

        {/* Footer Navigation */}
        <div className="flex gap-6 text-sm text-peach/75">
          <Link to="" className="hover:text-cream transition-colors duration-200">Home</Link>
          <Link to="/add-user" className="hover:text-cream transition-colors duration-200">Add User</Link>
          <Link to="/users-list" className="hover:text-cream transition-colors duration-200">User List</Link>
        </div>

        {/* Footer Copyright */}
        <div className="text-xs text-peach/50 text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} UserSphere. All rights reserved.</p>
          <p className="mt-1">Crafted with premium developer aesthetics.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;