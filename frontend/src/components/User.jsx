import { useLocation } from "react-router";

function User() {
  let { state } = useLocation();

  console.log(state.user);
  return (
    <div> 
      <h1 className="text-5xl text-blue-900 text-center mb-10 font-serif">Details of User</h1>
      <div className="text-3xl rounded-xl border-amber-950 border-4  p-10 shadow-4xl shadow-amber-800 bg-pink-200 font-bold ">
      <p>Name: {state?.user?.name}</p>
      <p>Email: {state?.user?.email}</p>
      <p>Date of Birth: {state?.user?.dateOfBirth}</p>
      <p>Mobile Number: {state?.user?.mobileNumber}</p>
      </div>
    </div>
  );
}

export default User;