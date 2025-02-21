import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {userLogout} = useAuth();
    const navigate = useNavigate()
    const handlelogout = () => {
        userLogout()
        .then((result) => {
            // console.log(result);
            navigate("/login")
        })
        .catch((err) => console.log(err.message));
    }
    return (
        <div className="">
        <button
          onClick={handlelogout}
          className=" p-2 bg-red-400 text-white 
                rounded-lg flex items-center justify-center "
        >
          
          Sign Out
        </button>
      </div>
    );
};

export default Logout;