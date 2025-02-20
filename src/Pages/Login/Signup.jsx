import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center text-white">
      <h2 className="font-bold  text-2xl my-3 ">Sign Up</h2>
      or
      <Link to="/" className="font-semibold  text-xl my-3 ">Go Home</Link>
      <div className="space-y-4 shadow-2xl p-4">
        <div>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border  rounded-lg shadow-sm"
            placeholder="Name Please"
            required
          />
        </div>
        <div>
          <input
            type="url"
            name="photo"
            className="w-full px-3 py-2 border  rounded-lg shadow-sm"
            placeholder="PhotoURl"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border  rounded-lg shadow-sm"
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border  rounded-lg shadow-sm"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg shadow-sm bg-[#006D77]   hover:scale-105 font-semibold  duration-500 ease-in-out"
        >
          Register
        </button>
        <button
          // onClick={handleGoogleLogin}
          className="w-full px-4 py-2 mt-4  rounded-lg shadow-sm  flex items-center justify-center bg-[#006D77]  hover:scale-110  duration-500 ease-in-out"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
