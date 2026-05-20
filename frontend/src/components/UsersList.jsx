import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const API_BASE_URL = "https://user-management-mini-app.onrender.com/user-api";

function UsersList() {
  let [users, setUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get(`${API_BASE_URL}/users`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          // update the state with API payload
          setUsers(res.data.payload);
        } else {
          console.error("Failed to load users", res);
        }
      } catch (err) {
        //set error
      }
    }

    getUsers();
  }, []);


  //go to user
  const gotoUser = (userObj) => {
    navigate("/user", { state: { user: userObj } })
  }

  return (
    <div>
      <h1 className="text-5xl text-blue-900 text-center mb-10 text-shadow-gray-700 text-shadow-2xl">List of Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {users?.map((userObj) => (
          <div key={userObj.email} className="p-10 shadow-2xl cursor-pointer" onClick={() => gotoUser(userObj)}>
            <p className="text-3xl">{userObj.name}</p>
            <p className="text-2xl">{userObj.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;