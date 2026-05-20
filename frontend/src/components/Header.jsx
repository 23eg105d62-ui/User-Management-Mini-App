import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/70 backdrop-blur-lg border-b border-mauve/25 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300 shadow-md">
      <div className="flex items-center gap-3">
        {/* Modern Brand Logo */}
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-plum to-peach flex items-center justify-center shadow-lg shadow-plum/25">
          <svg className="w-5.5 h-5.5 text-obsidian" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 8.625 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        </div>
        <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cream to-peach bg-clip-text text-transparent uppercase font-sans">
          UserSphere
        </span>
      </div>

      <ul className="flex items-center gap-1 sm:gap-3 md:gap-5 text-sm sm:text-base font-semibold">
        <li>
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "text-cream bg-plum/40 border border-mauve/30 shadow-inner" 
                  : "text-peach/80 hover:text-cream hover:bg-plum/20"
              }`
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "text-cream bg-plum/40 border border-mauve/30 shadow-inner" 
                  : "text-peach/80 hover:text-cream hover:bg-plum/20"
              }`
            }
          >
            Add User
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users-list"
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "text-cream bg-plum/40 border border-mauve/30 shadow-inner" 
                  : "text-peach/80 hover:text-cream hover:bg-plum/20"
              }`
            }
          >
            User List
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;