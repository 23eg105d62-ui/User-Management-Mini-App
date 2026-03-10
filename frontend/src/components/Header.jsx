import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="flex justify-between px-10 items-center bg-lime-300 py-5">
      <img className="rounded-full" width="80px" src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png" alt="" />
      <ul className="flex gap-6 text-2xl p-5"> 
        <h1 className="text-5xl text-center font-medium font-serif">USER MANAGEMENT SYSTEM MINI PROJECT</h1>
        <li>
          <NavLink to="" className={({ isActive }) => (isActive ? "bg-blue-200 text-lime-50 rounded-xl p-3 shadow" : "")}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-user"
            className={({ isActive }) => (isActive ? "bg-blue-200 text-lime-50 rounded-2xl p-3" : "")}
          >
            AddUsers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users-list"
            className={({ isActive }) => (isActive ? "bg-blue-200 text-lime-50 rounded-2xl p-3" : "")}
          >
            UsersList
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;